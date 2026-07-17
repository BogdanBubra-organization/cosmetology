/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */
import {
  ICON_PICKER_PLUGIN_NAME,
  LANDING_FIELDSET_TITLE,
  SERVICE_API_KEY,
  blockDefinitions,
  createManagementClient,
  fieldPayload,
  findField,
  findItemType,
  legacyLandingFieldDefinition,
  staticSectionFieldDefinitions,
} from './service-landing-schema.mjs'
import { restoreLegacySections } from './service-landing-migration.mjs'

const ensureLegacyField = async (client, service, itemTypes) => {
  const existing = await findField(client, service, 'landing_sections')

  if (existing) return existing

  const fieldsets = await client.fieldsets.list(service)
  let fieldset = fieldsets.find(({ title }) => title === LANDING_FIELDSET_TITLE)

  if (!fieldset) {
    fieldset = await client.fieldsets.create(service, {
      title: LANDING_FIELDSET_TITLE,
      hint: 'Контент нового шаблону сторінки послуги.',
      collapsible: true,
      start_collapsed: true,
    })
  }

  const created = await client.fields.create(
    service,
    fieldPayload(legacyLandingFieldDefinition, itemTypes, fieldset)
  )
  console.log('Recreated Service.landing_sections')
  return created
}

const restoreIconSelect = async (client, itemTypes) => {
  const featureDefinition = blockDefinitions.find(
    ({ apiKey }) => apiKey === 'service_landing_feature'
  )
  const iconDefinition = featureDefinition.fields.find(
    ({ apiKey }) => apiKey === 'icon_key'
  )
  const field = await findField(
    client,
    itemTypes.get(featureDefinition.apiKey),
    iconDefinition.apiKey
  )

  await client.fields.update(field, {
    validators: iconDefinition.validators,
    appearance: iconDefinition.appearance,
    hint: null,
  })
  console.log('Restored built-in service icon select')
}

const run = async () => {
  const client = await createManagementClient()
  const service = await findItemType(client, SERVICE_API_KEY)

  if (!service) {
    throw new Error(`DatoCMS model ${SERVICE_API_KEY} was not found`)
  }

  const itemTypes = new Map()

  for (const definition of blockDefinitions) {
    const itemType = await findItemType(client, definition.apiKey)

    if (!itemType) {
      throw new Error(`Missing block model ${definition.apiKey}`)
    }

    itemTypes.set(definition.apiKey, itemType)
  }

  const staticFields = []

  for (const definition of staticSectionFieldDefinitions) {
    const field = await findField(client, service, definition.apiKey)

    if (field) staticFields.push(field)
  }

  await ensureLegacyField(client, service, itemTypes)

  if (staticFields.length) {
    if (staticFields.length !== staticSectionFieldDefinitions.length) {
      throw new Error(
        `Rollback aborted: found ${staticFields.length} of ${staticSectionFieldDefinitions.length} static fields`
      )
    }

    await restoreLegacySections(client, service, itemTypes)

    for (const definition of [...staticSectionFieldDefinitions].reverse()) {
      const field = await findField(client, service, definition.apiKey)
      await client.fields.destroy(field)
      console.log(`Deleted Service.${definition.apiKey}`)
    }
  }

  await restoreIconSelect(client, itemTypes)

  const plugins = await client.plugins.list()
  const plugin = plugins.find(({ name }) => name === ICON_PICKER_PLUGIN_NAME)

  if (plugin) {
    await client.plugins.destroy(plugin)
    console.log(`Deleted plugin ${ICON_PICKER_PLUGIN_NAME}`)
  }

  console.log('Service landing static migration rolled back successfully')
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
