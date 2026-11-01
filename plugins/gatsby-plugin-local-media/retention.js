/* eslint-disable no-await-in-loop, no-restricted-syntax */
const { createHash } = require('node:crypto')
const { mkdir, readFile, readdir, writeFile } = require('node:fs/promises')
const path = require('node:path')

const checksum = (bytes) => createHash('sha256').update(bytes).digest('hex')

async function restoreRetainedMedia({
  cacheRoot,
  publicRoot,
  legacyDirectory,
  previousManifestUrl,
}) {
  const indexFile = path.join(cacheRoot, 'retained-index.json')
  let files = []
  try {
    files = JSON.parse(await readFile(indexFile, 'utf8'))
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  if (legacyDirectory) {
    files = await Promise.all(
      (await readdir(legacyDirectory)).map(async (filename) => {
        const bytes = await readFile(path.join(legacyDirectory, filename))
        const sha256 = checksum(bytes)
        await mkdir(path.join(cacheRoot, 'outputs'), { recursive: true })
        await writeFile(path.join(cacheRoot, 'outputs', filename), bytes)
        return { url: `/media/${filename}`, hash: sha256, bytes: bytes.length }
      })
    )
  } else if (previousManifestUrl) {
    try {
      const response = await fetch(previousManifestUrl, {
        signal: AbortSignal.timeout(15000),
      })
      if (response.ok) files = (await response.json()).files
      else if (response.status !== 404 && !files.length)
        throw new Error(`Previous media index unavailable: ${response.status}`)
    } catch (error) {
      if (!files.length) throw error
    }
  }
  await mkdir(publicRoot, { recursive: true })
  await mkdir(path.join(cacheRoot, 'outputs'), { recursive: true })
  let downloaded = 0
  const queue = [...files]
  await Promise.all(
    Array.from({ length: 3 }, async () => {
      while (queue.length) {
        const file = queue.shift()
        if (
          !/^\/media\/[a-f0-9]{24}\.(?:svg|webp|avif|png|jpe?g|mp4|webm|gif|pdf)$/.test(
            file.url
          ) ||
          !file.hash?.startsWith(path.basename(file.url).split('.')[0])
        )
          throw new Error('Invalid retained media entry')
        const filename = path.join(
          cacheRoot,
          'outputs',
          path.basename(file.url)
        )
        let bytes
        try {
          bytes = await readFile(filename)
        } catch (error) {
          if (error.code !== 'ENOENT') throw error
        }
        if (!bytes || checksum(bytes) !== file.hash) {
          if (!previousManifestUrl)
            throw new Error('Retained media cache mismatch')
          const response = await fetch(new URL(file.url, previousManifestUrl), {
            signal: AbortSignal.timeout(60000),
          })
          if (!response.ok)
            throw new Error(
              `Retained media download failed: ${response.status}`
            )
          bytes = Buffer.from(await response.arrayBuffer())
          if (checksum(bytes) !== file.hash)
            throw new Error('Retained media checksum mismatch')
          await writeFile(filename, bytes)
          downloaded += 1
        }
        await writeFile(path.join(publicRoot, path.basename(file.url)), bytes)
      }
    })
  )
  await writeFile(indexFile, JSON.stringify(files))
  return { files: files.length, downloaded }
}

module.exports = { restoreRetainedMedia }
