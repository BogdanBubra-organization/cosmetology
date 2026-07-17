/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */
import {
  ICON_PICKER_FIELD_EXTENSION,
  ICON_PICKER_PLUGIN_NAME,
  SERVICE_API_KEY,
  createManagementClient,
  findField,
  findItemType,
  iconCatalog,
  sectionBlockDefinitions,
  staticSectionFieldDefinitions,
} from './service-landing-schema.mjs'
import {
  listServiceRecords,
  verifyStaticSections,
} from './service-landing-migration.mjs'

const run = async () => {
  const client = await createManagementClient()
  const service = await findItemType(client, SERVICE_API_KEY)

  if (!service) {
    throw new Error(`DatoCMS model ${SERVICE_API_KEY} was not found`)
  }

  const itemTypes = new Map()

  for (const definition of sectionBlockDefinitions) {
    const itemType = await findItemType(client, definition.apiKey)

    if (!itemType) throw new Error(`Missing block model ${definition.apiKey}`)
    itemTypes.set(definition.apiKey, itemType)
  }

  const serviceFields = await client.fields.list(service)
  const staticFields = staticSectionFieldDefinitions.map((definition) =>
    serviceFields.find(({ api_key: apiKey }) => apiKey === definition.apiKey)
  )

  if (
    staticFields.some(
      (field, index) =>
        !field ||
        field.field_type !== 'single_block' ||
        (index > 0 && field.position <= staticFields[index - 1].position)
    )
  ) {
    throw new Error('Static Service field type/order audit failed')
  }

  const legacyField = serviceFields.find(
    ({ api_key: apiKey }) => apiKey === 'landing_sections'
  )
  const requireLegacy = Boolean(legacyField)

  await verifyStaticSections(client, service, itemTypes, { requireLegacy })
  await verifyStaticSections(client, service, itemTypes, {
    requireLegacy,
    version: 'published',
  })

  const feature = await findItemType(client, 'service_landing_feature')
  const iconField = await findField(client, feature, 'icon_key')
  const plugins = await client.plugins.list()
  const plugin = plugins.find(({ name }) => name === ICON_PICKER_PLUGIN_NAME)

  if (
    !plugin ||
    iconField.appearance?.editor !== plugin.id ||
    iconField.appearance?.field_extension !== ICON_PICKER_FIELD_EXTENSION ||
    iconField.validators?.enum?.values?.length !== iconCatalog.length
  ) {
    throw new Error('Service icon picker audit failed')
  }

  const services = await listServiceRecords(client, service)

  console.log(
    JSON.stringify(
      {
        environment: process.env.DATOCMS_ENVIRONMENT,
        services: services.length,
        staticFields: staticFields.length,
        legacyFieldPresent: requireLegacy,
        iconKeys: iconCatalog.length,
        plugins: plugins.length,
      },
      null,
      2
    )
  )
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
