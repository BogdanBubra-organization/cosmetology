const path = require('node:path')
const { createMediaStore } = require('./media-store')
const { auditOutput } = require('./audit-output')

let store

const initializeStore = (gatsbyStore, options) => {
  store = createMediaStore({
    projectRoot: gatsbyStore.getState().program.directory,
    cacheDirectory: options.cacheDirectory,
    backupDirectory: options.backupDirectory,
    legacyDirectory: options.legacyDirectory,
    previousManifestUrl: options.previousManifestUrl,
  })
}

exports.onPreInit = async ({ store: gatsbyStore }, options) => {
  initializeStore(gatsbyStore, options)
  await store.begin()
}

exports.onPostBootstrap = async ({ getNodesByType }) => {
  await store.retain()
  await store.prefetch(
    getNodesByType('DatoCmsAsset').map((node) => node.entityPayload.attributes)
  )
}

exports.createResolvers = (
  { createResolvers, store: gatsbyStore },
  options
) => {
  if (!store) initializeStore(gatsbyStore, options)
  const assetFields = Object.fromEntries(
    ['url', 'gatsbyImageData', 'fluid', 'fixed'].map((field) => [
      field,
      {
        async resolve(source, args, context, info) {
          const value = await info.originalResolver(source, args, context, info)
          return store.localize(value, source.entityPayload.attributes)
        },
      },
    ])
  )
  createResolvers({
    DatoCmsAsset: assetFields,
    DatoCmsFileField: assetFields,
    DatoCmsAssetVideo: {
      thumbnailUrl: {
        async resolve(source, args, context, info) {
          const url = await info.originalResolver(source, args, context, info)
          return store.poster(url)
        },
      },
    },
  })
}

exports.onPostBuild = async ({ reporter, store: gatsbyStore }) => {
  await auditOutput(
    path.join(gatsbyStore.getState().program.directory, 'public')
  )
  const report = await store.finish()
  const bytes = report.files.reduce((sum, file) => sum + file.bytes, 0)
  reporter.info(
    `Local media: ${report.files.length} files, ${bytes} bytes; ${report.stats.originalDownloads} original downloads, ${report.stats.variantCacheHits} cached variants`
  )
}
