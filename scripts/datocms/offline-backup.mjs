/* eslint-disable import/no-extraneous-dependencies, no-await-in-loop, no-console, no-restricted-syntax */
import 'dotenv/config'

import { createHash } from 'node:crypto'
import { createReadStream, createWriteStream } from 'node:fs'
import { mkdir, readdir, rename, stat, writeFile } from 'node:fs/promises'
import { basename, join, relative } from 'node:path'
import { pipeline } from 'node:stream/promises'

import { buildClient } from '@datocms/cma-client-node'

const apiToken =
  process.env.DATOCMS_MANAGEMENT_API_TOKEN || process.env.DATOCMS_API_TOKEN
const environment = process.env.DATOCMS_BACKUP_ENVIRONMENT || 'main'
const backupRoot =
  process.env.DATOCMS_BACKUP_DIRECTORY || 'output/datocms-backups'
const timestamp = new Date()
  .toISOString()
  .replaceAll(':', '-')
  .replace('.', '-')
const backupDirectory =
  process.argv[2] || join(backupRoot, `datocms-${environment}-${timestamp}`)

if (!apiToken) {
  throw new Error(
    'DATOCMS_MANAGEMENT_API_TOKEN or DATOCMS_API_TOKEN is required'
  )
}

const client = buildClient({ apiToken, environment })

const writeJson = (path, value) =>
  writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8')

const safeFileName = (value) =>
  value
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'file'

const fileHash = async (path, algorithm) => {
  const hash = createHash(algorithm)

  for await (const chunk of createReadStream(path)) {
    hash.update(chunk)
  }

  return hash.digest('hex')
}

const downloadAsset = async (upload, assetsDirectory) => {
  const fileName = `${safeFileName(upload.id)}__${safeFileName(
    upload.filename || basename(upload.path)
  )}`
  const filePath = join(assetsDirectory, fileName)
  const partialFilePath = `${filePath}.partial`
  let fileStats

  try {
    fileStats = await stat(filePath)
  } catch {
    const response = await fetch(upload.url)

    if (!response.ok || !response.body) {
      throw new Error(
        `Failed to download ${upload.url}: HTTP ${response.status}`
      )
    }

    await pipeline(response.body, createWriteStream(partialFilePath))
    await rename(partialFilePath, filePath)
    fileStats = await stat(filePath)
  }

  if (fileStats.size === 0) {
    throw new Error(`Downloaded asset ${upload.id} is empty`)
  }

  const actualMd5 = await fileHash(filePath, 'md5')

  return {
    uploadId: upload.id,
    sourceUrl: upload.url,
    path: `assets/${fileName}`,
    size: fileStats.size,
    expectedSize: upload.size,
    sizeMatches: fileStats.size === upload.size,
    md5: actualMd5,
    expectedMd5: upload.md5,
    md5Matches: actualMd5 === upload.md5,
  }
}

const listFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const paths = []

  for (const entry of entries) {
    if (entry.name !== 'SHA256SUMS' && !entry.name.endsWith('.partial')) {
      const entryPath = join(directory, entry.name)

      if (entry.isDirectory()) {
        paths.push(...(await listFiles(entryPath)))
      } else {
        paths.push(entryPath)
      }
    }
  }

  return paths.sort()
}

const sha256 = (path) => fileHash(path, 'sha256')

const exportOptionalResources = async (settingsDirectory) => {
  const resources = [
    'workflows',
    'plugins',
    'schemaMenuItems',
    'uploadCollections',
    'uploadTags',
  ]
  const warnings = []

  for (const resource of resources) {
    try {
      const value = await client[resource].list()
      await writeJson(join(settingsDirectory, `${resource}.json`), value)
    } catch (error) {
      warnings.push(`${resource}: ${error.message}`)
    }
  }

  return warnings
}

const run = async () => {
  const environments = await client.environments.list()
  const sourceEnvironment = environments.find(({ id }) => id === environment)

  if (!sourceEnvironment) {
    throw new Error(`DatoCMS environment ${environment} does not exist`)
  }

  const schemaDirectory = join(backupDirectory, 'schema')
  const currentRecordsDirectory = join(backupDirectory, 'records', 'current')
  const publishedRecordsDirectory = join(
    backupDirectory,
    'records',
    'published'
  )
  const assetsDirectory = join(backupDirectory, 'assets')
  const settingsDirectory = join(backupDirectory, 'settings')

  await Promise.all(
    [
      schemaDirectory,
      currentRecordsDirectory,
      publishedRecordsDirectory,
      assetsDirectory,
      settingsDirectory,
    ].map((directory) => mkdir(directory, { recursive: true }))
  )

  console.log(`Backing up DatoCMS environment ${environment}`)

  const site = await client.site.find()
  await writeJson(join(settingsDirectory, 'site.json'), site)
  await writeJson(
    join(settingsDirectory, 'environment.json'),
    sourceEnvironment
  )

  const itemTypes = await client.itemTypes.list()
  const schema = []

  for (const itemType of itemTypes) {
    const [fields, fieldsets] = await Promise.all([
      client.fields.list(itemType),
      client.fieldsets.list(itemType),
    ])

    schema.push({ itemType, fields, fieldsets })
  }

  await writeJson(join(schemaDirectory, 'schema.json'), schema)
  console.log(`Exported ${itemTypes.length} models and block models`)

  const models = itemTypes.filter(
    ({ modular_block: modularBlock }) => !modularBlock
  )
  let currentRecordCount = 0
  let publishedRecordCount = 0

  for (const model of models) {
    const currentRecords = []
    const publishedRecords = []

    for await (const record of client.items.listPagedIterator({
      filter: { type: model.id },
      nested: true,
      version: 'current',
    })) {
      currentRecords.push(record)
    }

    for await (const record of client.items.listPagedIterator({
      filter: { type: model.id },
      nested: true,
      version: 'published',
    })) {
      publishedRecords.push(record)
    }

    const modelName = safeFileName(model.api_key)
    await Promise.all([
      writeJson(
        join(currentRecordsDirectory, `${modelName}.json`),
        currentRecords
      ),
      writeJson(
        join(publishedRecordsDirectory, `${modelName}.json`),
        publishedRecords
      ),
    ])

    currentRecordCount += currentRecords.length
    publishedRecordCount += publishedRecords.length
  }

  console.log(
    `Exported ${currentRecordCount} current and ${publishedRecordCount} published records`
  )

  const uploads = []
  for await (const upload of client.uploads.listPagedIterator()) {
    uploads.push(upload)
  }

  await writeJson(join(backupDirectory, 'uploads.json'), uploads)

  const assetManifest = []
  for (const [index, upload] of uploads.entries()) {
    console.log(`Downloading asset ${index + 1}/${uploads.length}`)
    assetManifest.push(await downloadAsset(upload, assetsDirectory))
  }

  await writeJson(join(backupDirectory, 'asset-manifest.json'), assetManifest)
  console.log(`Downloaded ${uploads.length} assets`)

  const warnings = await exportOptionalResources(settingsDirectory)
  const assetMetadataMismatches = assetManifest.filter(
    ({ sizeMatches, md5Matches }) => !sizeMatches || !md5Matches
  )

  if (assetMetadataMismatches.length > 0) {
    warnings.push(
      `${assetMetadataMismatches.length} downloaded assets differ from stored size or MD5 metadata; actual hashes are recorded in asset-manifest.json`
    )
  }
  const manifest = {
    format: 'datocms-offline-backup',
    version: 1,
    createdAt: new Date().toISOString(),
    environment,
    primary: sourceEnvironment.meta.primary,
    counts: {
      itemTypes: itemTypes.length,
      models: models.length,
      currentRecords: currentRecordCount,
      publishedRecords: publishedRecordCount,
      uploads: uploads.length,
      assetBytes: assetManifest.reduce((total, asset) => total + asset.size, 0),
    },
    warnings,
  }

  await writeJson(join(backupDirectory, 'manifest.json'), manifest)

  const files = await listFiles(backupDirectory)
  const checksums = []

  for (const file of files) {
    checksums.push(`${await sha256(file)}  ${relative(backupDirectory, file)}`)
  }

  await writeFile(
    join(backupDirectory, 'SHA256SUMS'),
    `${checksums.join('\n')}\n`,
    'utf8'
  )

  console.log(JSON.stringify({ backupDirectory, ...manifest.counts }, null, 2))
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
