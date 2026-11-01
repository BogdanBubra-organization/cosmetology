const { test } = require('node:test')
const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const { mkdtemp, mkdir, readFile, rm, writeFile } = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const sharp = require('sharp')
const { createMediaStore, transformImage } = require('./media-store')
const { restoreRetainedMedia } = require('./retention')

test('focal crops preserve the selected side and requested aspect ratio', async () => {
  const red = await sharp({
    create: { width: 60, height: 80, channels: 3, background: '#f00' },
  })
    .png()
    .toBuffer()
  const image = await sharp({
    create: { width: 120, height: 80, channels: 3, background: '#00f' },
  })
    .composite([{ input: red, left: 0, top: 0 }])
    .png()
    .toBuffer()
  const left = await transformImage(
    image,
    'https://www.datocms-assets.com/1/image.png?w=40&h=40&fit=crop&crop=focalpoint&fp-x=0&fp-y=0.5'
  )
  const right = await transformImage(
    image,
    'https://www.datocms-assets.com/1/image.png?w=40&h=40&fit=crop&crop=focalpoint&fp-x=1&fp-y=0.5'
  )
  const leftStats = await sharp(left.data).stats()
  const rightStats = await sharp(right.data).stats()
  assert.equal(left.info.width, 40)
  assert.equal(left.info.height, 40)
  assert(leftStats.channels[0].mean > leftStats.channels[2].mean)
  assert(rightStats.channels[2].mean > rightStats.channels[0].mean)
})

test('a fresh output retains old hashed assets for cached pages', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'cosmetology-retention-'))
  try {
    const legacyDirectory = path.join(root, 'legacy')
    await mkdir(legacyDirectory)
    const bytes = await sharp({
      create: { width: 8, height: 8, channels: 3, background: '#123456' },
    })
      .png()
      .toBuffer()
    const filename = `${createHash('sha256')
      .update(bytes)
      .digest('hex')
      .slice(0, 24)}.png`
    await writeFile(path.join(legacyDirectory, filename), bytes)
    const options = {
      cacheRoot: path.join(root, 'cache'),
      publicRoot: path.join(root, 'first'),
      legacyDirectory,
    }
    await restoreRetainedMedia(options)
    const result = await restoreRetainedMedia({
      ...options,
      publicRoot: path.join(root, 'second'),
      legacyDirectory: undefined,
    })
    assert.equal(result.files, 1)
    assert.equal(result.downloaded, 0)
    assert.deepEqual(await readFile(path.join(root, 'second', filename)), bytes)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('responsive URLs and a fresh build reuse verified cache without downloads', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'cosmetology-media-'))
  try {
    const backupDirectory = path.join(root, 'backup')
    await mkdir(path.join(backupDirectory, 'assets'), { recursive: true })
    const original = await sharp({
      create: { width: 120, height: 80, channels: 3, background: '#123456' },
    })
      .png()
      .toBuffer()
    const md5 = createHash('md5').update(original).digest('hex')
    const upload = {
      path: '/1/test.png',
      url: 'https://www.datocms-assets.com/1/test.png',
      md5,
      size: original.length,
      format: 'png',
      is_image: true,
    }
    await writeFile(path.join(backupDirectory, 'assets/test.png'), original)
    await writeFile(
      path.join(backupDirectory, 'asset-manifest.json'),
      JSON.stringify([{ sourceUrl: upload.url, path: 'assets/test.png', md5 }])
    )
    const options = {
      projectRoot: path.join(root, 'first'),
      backupDirectory,
      cacheDirectory: path.join(root, 'cache'),
    }
    const first = createMediaStore(options)
    await first.begin()
    await first.prefetch([upload])
    const srcSet = `${upload.url}?auto=compress,format&w=20 20w, ${upload.url}?w=40 40w`
    const localized = await first.localize(srcSet, upload)
    assert.match(
      localized,
      /^\/media\/[a-f0-9]+\.webp 20w, \/media\/[a-f0-9]+\.webp 40w$/
    )
    const report = await first.finish()
    assert.equal(report.stats.originalDownloads, 0)
    assert.equal(report.stats.backupHits, 1)
    const second = createMediaStore({
      ...options,
      projectRoot: path.join(root, 'second'),
      backupDirectory: undefined,
    })
    await second.begin()
    await second.prefetch([upload])
    assert.equal(await second.localize(srcSet, upload), localized)
    const cached = await second.finish()
    assert.equal(cached.stats.originalDownloads, 0)
    assert.equal(cached.stats.generatedVariants, 0)
    assert.equal(cached.stats.variantCacheHits, 2)
    await Promise.all(
      cached.files.map(async (file) => {
        const bytes = await readFile(path.join(root, 'second/public', file.url))
        assert.equal(
          createHash('sha256').update(bytes).digest('hex'),
          file.hash
        )
      })
    )
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
