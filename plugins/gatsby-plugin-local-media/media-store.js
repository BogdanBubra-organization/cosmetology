/* eslint-disable no-await-in-loop, no-restricted-syntax */
const { createHash, randomUUID } = require('node:crypto')
const {
  appendFile,
  mkdir,
  readFile,
  readdir,
  rename,
  writeFile,
} = require('node:fs/promises')
const path = require('node:path')
const sharp = require('sharp')
const { restoreRetainedMedia } = require('./retention')

const hash = (value, algorithm = 'sha256') =>
  createHash(algorithm).update(value).digest('hex')
const exists = async (file) => {
  try {
    return await readFile(file)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    return null
  }
}

const writeAtomic = async (file, bytes) => {
  await mkdir(path.dirname(file), { recursive: true })
  const temporary = `${file}.${randomUUID()}.partial`
  await writeFile(temporary, bytes)
  await rename(temporary, file)
}

function imageDimensions(params) {
  const dpr = Number(params.get('dpr') || 1)
  if (!Number.isFinite(dpr) || dpr <= 0) throw new Error('Invalid image DPR')
  const dimension = (key) => {
    if (!params.has(key)) return undefined
    const value = Math.round(Number(params.get(key)) * dpr)
    if (!Number.isFinite(value) || value < 1 || value > 20000)
      throw new Error(`Invalid image ${key}`)
    return value
  }
  let width = dimension('w')
  let height = dimension('h')
  if (params.has('ar') && (!width || !height)) {
    const [horizontal, vertical = 1] = params.get('ar').split(':').map(Number)
    const ratio = horizontal / vertical
    if (!Number.isFinite(ratio) || ratio <= 0)
      throw new Error('Invalid image aspect ratio')
    if (width) height = Math.round(width / ratio)
    else if (height) width = Math.round(height * ratio)
  }
  const scale = Math.min(1, 2400 / Math.max(width || 0, height || 0))
  return {
    width: width && Math.max(1, Math.round(width * scale)),
    height: height && Math.max(1, Math.round(height * scale)),
  }
}

async function transformImage(bytes, url) {
  const params = new URL(url).searchParams
  let { width, height } = imageDimensions(params)
  const cover = params.get('fit') === 'crop' && width && height
  let image = sharp(bytes).rotate()
  if (cover && params.get('crop') === 'focalpoint') {
    const rotated = await image.toBuffer({ resolveWithObject: true })
    image = sharp(rotated.data)
    const ratio = width / height
    const cropWidth = Math.min(
      rotated.info.width,
      Math.round(rotated.info.height * ratio)
    )
    const cropHeight = Math.min(
      rotated.info.height,
      Math.round(rotated.info.width / ratio)
    )
    const position = (key, full, size) => {
      const focal = Number(params.get(key) ?? 0.5)
      if (!Number.isFinite(focal) || focal < 0 || focal > 1)
        throw new Error('Invalid image focal point')
      return Math.max(
        0,
        Math.min(full - size, Math.round(focal * full - size / 2))
      )
    }
    image = image.extract({
      left: position('fp-x', rotated.info.width, cropWidth),
      top: position('fp-y', rotated.info.height, cropHeight),
      width: cropWidth,
      height: cropHeight,
    })
  }
  if (!width && !height) {
    width = 2400
    height = 2400
  }
  return image
    .resize({
      width,
      height,
      fit: cover ? 'cover' : 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 86, effort: 4 })
    .toBuffer({ resolveWithObject: true })
}

function createMediaStore({
  projectRoot,
  cacheDirectory,
  backupDirectory,
  legacyDirectory,
  previousManifestUrl,
}) {
  const cacheRoot =
    cacheDirectory || path.join(projectRoot, '.cache/local-media')
  const publicRoot = path.join(projectRoot, 'public/media')
  const eventsFile = path.join(
    cacheRoot,
    `events-${hash(projectRoot).slice(0, 16)}.jsonl`
  )
  const originals = new Map()
  const variants = new Map()
  const published = new Map()
  const posters = new Map()
  const stats = {
    originalDownloads: 0,
    originalCacheHits: 0,
    backupHits: 0,
    generatedVariants: 0,
    variantCacheHits: 0,
    posterDownloads: 0,
  }
  let backupAssets
  let active = 0
  const waiting = []

  async function limited(work) {
    if (active >= 3)
      await new Promise((resolve) => {
        waiting.push(resolve)
      })
    active += 1
    try {
      return await work()
    } finally {
      active -= 1
      waiting.shift()?.()
    }
  }

  async function original(upload) {
    const key = upload.md5
    if (!key || !/^[a-f0-9]{32}$/i.test(key))
      throw new Error('Missing original MD5')
    if (!originals.has(key))
      originals.set(
        key,
        (async () => {
          const file = path.join(cacheRoot, 'originals', key)
          let bytes = await exists(file)
          if (
            bytes &&
            (hash(bytes, 'md5') !== key || bytes.length !== upload.size)
          )
            bytes = null
          if (bytes) stats.originalCacheHits += 1
          if (!bytes && backupDirectory) {
            if (!backupAssets)
              backupAssets = readFile(
                path.join(backupDirectory, 'asset-manifest.json'),
                'utf8'
              ).then(JSON.parse)
            const asset = (await backupAssets).find(
              (item) =>
                new URL(item.sourceUrl).pathname === upload.path &&
                item.md5 === key
            )
            if (asset) {
              const candidate = path.resolve(backupDirectory, asset.path)
              if (
                !candidate.startsWith(
                  `${path.resolve(backupDirectory)}${path.sep}`
                )
              )
                throw new Error('Unsafe backup asset path')
              const saved = await readFile(candidate)
              if (hash(saved, 'md5') === key && saved.length === upload.size) {
                bytes = saved
                stats.backupHits += 1
              }
            }
          }
          if (!bytes) {
            const url = new URL(upload.url)
            if (url.hostname !== 'www.datocms-assets.com')
              throw new Error('Unexpected media origin')
            if (upload.format === 'svg')
              url.searchParams.set('svg-sanitize', 'false')
            const response = await fetch(url, {
              signal: AbortSignal.timeout(60000),
            })
            if (!response.ok)
              throw new Error(`Original download failed: ${response.status}`)
            bytes = Buffer.from(await response.arrayBuffer())
            if (hash(bytes, 'md5') !== key || bytes.length !== upload.size)
              throw new Error('Original media checksum mismatch')
            stats.originalDownloads += 1
          }
          await mkdir(path.dirname(file), { recursive: true })
          await writeAtomic(file, bytes)
          return bytes
        })()
      )
    return originals.get(key)
  }

  async function publish(bytes, extension, dimensions = {}) {
    const checksum = hash(bytes)
    const filename = `${checksum.slice(0, 24)}.${extension}`
    await mkdir(publicRoot, { recursive: true })
    if (!published.has(filename))
      await writeAtomic(path.join(publicRoot, filename), bytes)
    const result = {
      url: `/media/${filename}`,
      hash: checksum,
      bytes: bytes.length,
      ...dimensions,
    }
    published.set(filename, result)
    return result
  }

  async function variant(upload, url) {
    const key = hash(JSON.stringify([2, upload.md5, url]))
    if (!variants.has(key))
      variants.set(
        key,
        limited(async () => {
          const indexFile = path.join(cacheRoot, 'variants', `${key}.json`)
          const index = await exists(indexFile)
          if (index) {
            const cached = JSON.parse(index)
            const bytes = await exists(
              path.join(cacheRoot, 'outputs', path.basename(cached.url))
            )
            if (bytes && hash(bytes) === cached.hash) {
              stats.variantCacheHits += 1
              await appendFile(
                eventsFile,
                `${JSON.stringify({
                  key,
                  cached: true,
                  sourceMd5: upload.md5,
                  sourcePath: upload.path,
                  outputUrl: cached.url,
                })}\n`
              )
              return publish(bytes, path.extname(cached.url).slice(1), {
                width: cached.width,
                height: cached.height,
              })
            }
          }
          const bytes = await original(upload)
          let result
          if (upload.is_image && upload.format !== 'svg') {
            const output = await transformImage(bytes, url)
            result = await publish(output.data, 'webp', {
              width: output.info.width,
              height: output.info.height,
            })
          } else {
            if (
              upload.format === 'svg' &&
              /<script|\bon\w+\s*=|<foreignObject|(?:href|src)\s*=\s*["'](?:https?:|\/\/|javascript:)/i.test(
                bytes.toString()
              )
            )
              throw new Error('SVG requires review before public hosting')
            result = await publish(bytes, upload.format)
          }
          await mkdir(path.join(cacheRoot, 'outputs'), { recursive: true })
          await writeAtomic(
            path.join(cacheRoot, 'outputs', path.basename(result.url)),
            await readFile(path.join(publicRoot, path.basename(result.url)))
          )
          await mkdir(path.dirname(indexFile), { recursive: true })
          await writeAtomic(indexFile, JSON.stringify(result))
          stats.generatedVariants += 1
          await appendFile(
            eventsFile,
            `${JSON.stringify({
              key,
              cached: false,
              sourceMd5: upload.md5,
              sourcePath: upload.path,
              outputUrl: result.url,
            })}\n`
          )
          return result
        })
      )
    return variants.get(key)
  }

  async function localize(value, upload) {
    if (typeof value === 'string') {
      if (!value.includes('https://www.datocms-assets.com/')) return value
      if (/\s+\d+(?:w|x)(?:,|$)/.test(value)) {
        const entries = await Promise.all(
          value.split(/,\s*(?=https?:\/\/)/).map(async (candidate) => {
            const [url, descriptor] = candidate.trim().split(/\s+/)
            const result = await variant(upload, url)
            return `${result.url}${
              descriptor
                ? ` ${
                    descriptor.endsWith('w') ? `${result.width}w` : descriptor
                  }`
                : ''
            }`
          })
        )
        return [...new Set(entries)].join(', ')
      }
      return (await variant(upload, value)).url
    }
    if (Array.isArray(value))
      return Promise.all(value.map((item) => localize(item, upload)))
    if (!value || typeof value !== 'object') return value
    return Object.fromEntries(
      await Promise.all(
        Object.entries(value).map(async ([key, child]) => [
          key,
          await localize(child, upload),
        ])
      )
    )
  }

  async function preparePoster(url) {
    const source = new URL(url)
    if (source.hostname !== 'image.mux.com')
      throw new Error('Unexpected video poster origin')
    const file = path.join(cacheRoot, 'posters', `${hash(url)}.webp`)
    let bytes = await exists(file)
    if (!bytes) {
      const response = await fetch(source, {
        signal: AbortSignal.timeout(30000),
      })
      if (!response.ok)
        throw new Error(`Video poster download failed: ${response.status}`)
      bytes = await sharp(Buffer.from(await response.arrayBuffer()))
        .resize({ width: 960, withoutEnlargement: true })
        .webp({ quality: 86 })
        .toBuffer()
      await mkdir(path.dirname(file), { recursive: true })
      await writeAtomic(file, bytes)
      stats.posterDownloads += 1
      await appendFile(eventsFile, `${JSON.stringify({ poster: url })}\n`)
    }
    return (await publish(bytes, 'webp')).url
  }

  async function poster(url) {
    if (posters.has(url)) return posters.get(url)
    const result = preparePoster(url)
    posters.set(url, result)
    return result
  }

  async function finish() {
    const previous = await exists(path.join(cacheRoot, 'build-report.json'))
    const previousSources = previous ? JSON.parse(previous).sources || [] : []
    const files = []
    for (const filename of await readdir(publicRoot)) {
      const bytes = await readFile(path.join(publicRoot, filename))
      files.push({
        url: `/media/${filename}`,
        hash: hash(bytes),
        bytes: bytes.length,
      })
    }
    const events = (await readFile(eventsFile, 'utf8'))
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(JSON.parse)
    stats.generatedVariants = new Set(
      events.filter((event) => event.cached === false).map((event) => event.key)
    ).size
    stats.variantCacheHits = new Set(
      events.filter((event) => event.cached === true).map((event) => event.key)
    ).size
    stats.posterDownloads = new Set(
      events.filter((event) => event.poster).map((event) => event.poster)
    ).size
    const report = {
      generatedAt: new Date().toISOString(),
      files,
      sources: [
        ...new Map(
          [
            ...previousSources.map((source) => ({
              sourcePath: source.path,
              sourceMd5: source.md5,
              outputUrl: source.url,
            })),
            ...events,
          ]
            .filter((event) => event.sourcePath)
            .map((event) => [
              `${event.sourcePath}:${event.sourceMd5}:${event.outputUrl}`,
              {
                path: event.sourcePath,
                md5: event.sourceMd5,
                url: event.outputUrl,
              },
            ])
        ).values(),
      ],
      stats,
    }
    await writeFile(
      path.join(projectRoot, 'public/media-index.json'),
      JSON.stringify({ files })
    )
    await writeFile(
      path.join(cacheRoot, 'retained-index.json'),
      JSON.stringify(files)
    )
    await mkdir(cacheRoot, { recursive: true })
    await writeFile(
      path.join(cacheRoot, 'build-report.json'),
      JSON.stringify(report, null, 2)
    )
    return report
  }

  async function begin() {
    await mkdir(cacheRoot, { recursive: true })
    await writeFile(eventsFile, '')
  }

  async function prefetch(uploads) {
    await Promise.all(uploads.map((upload) => limited(() => original(upload))))
  }

  async function retain() {
    const retained = await restoreRetainedMedia({
      cacheRoot,
      publicRoot,
      legacyDirectory,
      previousManifestUrl,
    })
    stats.retainedFiles = retained.files
    stats.retainedDownloads = retained.downloaded
  }

  return { localize, poster, finish, begin, prefetch, retain }
}

module.exports = { createMediaStore, transformImage }
