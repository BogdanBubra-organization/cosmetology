/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */
import {
  ICON_PICKER_FIELD_EXTENSION,
  ICON_PICKER_PLUGIN_NAME,
  LANDING_FIELDSET_TITLE,
  SERVICE_API_KEY,
  blockDefinitions,
  createManagementClient,
  fieldPayload,
  findField,
  findItemType,
  isLandingFieldDefinition,
  legacyLandingFieldDefinition,
  staticSectionFieldDefinitions,
} from './service-landing-schema.mjs'
import { migrateLegacySections } from './service-landing-migration.mjs'

const ensurePlugin = async (client) => {
  const entryPoint = process.env.DATOCMS_ICON_PICKER_ENTRYPOINT

  if (!entryPoint) {
    throw new Error('DATOCMS_ICON_PICKER_ENTRYPOINT is required')
  }

  let url

  try {
    url = new URL(entryPoint)
  } catch {
    throw new Error('DATOCMS_ICON_PICKER_ENTRYPOINT must be a valid URL')
  }

  if (!['https:', 'http:'].includes(url.protocol)) {
    throw new Error('Icon picker entry point must use HTTP or HTTPS')
  }

  const plugins = await client.plugins.list()
  const existing = plugins.find(({ name }) => name === ICON_PICKER_PLUGIN_NAME)
  const payload = {
    name: ICON_PICKER_PLUGIN_NAME,
    description: 'Visual picker for the static service icon catalog.',
    url: url.toString(),
    permissions: [],
  }

  if (existing) {
    if (existing.url !== payload.url) {
      const updated = await client.plugins.update(existing, payload)
      console.log(`Updated plugin ${ICON_PICKER_PLUGIN_NAME}`)
      return updated
    }

    return existing
  }

  try {
    const created = await client.plugins.create(payload)
    console.log(`Created plugin ${ICON_PICKER_PLUGIN_NAME}`)
    return created
  } catch (error) {
    throw new Error(
      `Private plugin preflight failed before schema changes: ${error.message}`
    )
  }
}

const ensureItemType = async (client, definition) => {
  const existing = await findItemType(client, definition.apiKey)

  if (existing) {
    if (!existing.modular_block) {
      throw new Error(`${definition.apiKey} exists but is not a block model`)
    }

    if (existing.name !== definition.name) {
      const updated = await client.itemTypes.update(existing, {
        name: definition.name,
      })
      console.log(`Updated block model ${definition.apiKey}`)
      return updated
    }

    return existing
  }

  const created = await client.itemTypes.create({
    name: definition.name,
    api_key: definition.apiKey,
    modular_block: true,
    sortable: false,
    draft_mode_active: false,
    draft_saving_active: false,
    tree: false,
  })

  console.log(`Created block model ${definition.apiKey}`)
  return created
}

const ensureField = async (
  client,
  itemType,
  definition,
  itemTypes,
  fieldset = null
) => {
  const existing = await findField(client, itemType, definition.apiKey)

  if (existing) {
    if (existing.field_type !== definition.fieldType) {
      throw new Error(
        `${itemType.api_key}.${definition.apiKey} has type ${existing.field_type}, expected ${definition.fieldType}`
      )
    }

    if (existing.label !== definition.label) {
      const updated = await client.fields.update(existing, {
        label: definition.label,
      })
      console.log(`Updated field ${itemType.api_key}.${definition.apiKey}`)
      return updated
    }

    return existing
  }

  const created = await client.fields.create(
    itemType,
    fieldPayload(definition, itemTypes, fieldset)
  )

  console.log(`Created field ${itemType.api_key}.${definition.apiKey}`)
  return created
}

const ensureFieldset = async (client, service) => {
  const fieldsets = await client.fieldsets.list(service)
  const existing = fieldsets.find(
    (fieldset) => fieldset.title === LANDING_FIELDSET_TITLE
  )

  if (existing) {
    if (!existing.collapsible || !existing.start_collapsed) {
      return client.fieldsets.update(existing, {
        collapsible: true,
        start_collapsed: true,
      })
    }

    return existing
  }

  const created = await client.fieldsets.create(service, {
    title: LANDING_FIELDSET_TITLE,
    hint: 'Контент нового шаблону сторінки послуги.',
    collapsible: true,
    start_collapsed: true,
  })

  console.log(`Created fieldset ${LANDING_FIELDSET_TITLE}`)
  return created
}

const expectedAllowedBlockIds = (definition, itemTypes) =>
  definition.allowedBlocks?.map((apiKey) => {
    const itemType = itemTypes.get(apiKey)

    if (!itemType) throw new Error(`Missing block model ${apiKey}`)
    return itemType.id
  }) || []

const verifyAllowedBlocks = (field, definition, itemTypes) => {
  if (!definition.allowedBlocks) return

  const validator =
    definition.fieldType === 'single_block'
      ? field.validators?.single_block_blocks
      : field.validators?.rich_text_blocks
  const actualIds = new Set(validator?.item_types || [])
  const expectedIds = expectedAllowedBlockIds(definition, itemTypes)

  if (
    expectedIds.some((id) => !actualIds.has(id)) ||
    actualIds.size !== expectedIds.length
  ) {
    throw new Error(
      `${field.item_type.id}.${definition.apiKey} block allow-list verification failed`
    )
  }
}

const configureIconPicker = async (client, itemTypes, plugin) => {
  const feature = itemTypes.get('service_landing_feature')
  const definition = blockDefinitions
    .find(({ apiKey }) => apiKey === 'service_landing_feature')
    .fields.find(({ apiKey }) => apiKey === 'icon_key')
  const field = await findField(client, feature, definition.apiKey)

  await client.fields.update(field, {
    validators: definition.validators,
    appearance: {
      editor: plugin.id,
      field_extension: ICON_PICKER_FIELD_EXTENSION,
      parameters: {},
      addons: [],
    },
    hint: null,
  })
  console.log('Configured service_landing_feature.icon_key visual picker')
}

const verifySchema = async (client, service, itemTypes, plugin) => {
  const serviceFields = await client.fields.list(service)
  const fieldsets = await client.fieldsets.list(service)
  const fieldset = fieldsets.find(
    ({ title }) => title === LANDING_FIELDSET_TITLE
  )

  if (!fieldset?.collapsible || !fieldset.start_collapsed) {
    throw new Error('Landing page fieldset verification failed')
  }

  for (const definition of blockDefinitions) {
    const itemType = itemTypes.get(definition.apiKey)

    if (
      !itemType?.modular_block ||
      itemType.api_key !== definition.apiKey ||
      itemType.name !== definition.name
    ) {
      throw new Error(`${definition.apiKey} block model verification failed`)
    }

    const fields = await client.fields.list(itemType)

    for (const fieldDefinition of definition.fields) {
      const field = fields.find(
        ({ api_key: apiKey }) => apiKey === fieldDefinition.apiKey
      )

      if (
        !field ||
        field.field_type !== fieldDefinition.fieldType ||
        field.label !== fieldDefinition.label
      ) {
        throw new Error(
          `${definition.apiKey}.${fieldDefinition.apiKey} verification failed`
        )
      }

      verifyAllowedBlocks(field, fieldDefinition, itemTypes)
    }
  }

  const serviceDefinitions = [
    isLandingFieldDefinition,
    legacyLandingFieldDefinition,
    ...staticSectionFieldDefinitions,
  ]

  for (const definition of serviceDefinitions) {
    const field = serviceFields.find(
      ({ api_key: apiKey }) => apiKey === definition.apiKey
    )

    if (
      !field ||
      field.field_type !== definition.fieldType ||
      field.label !== definition.label
    ) {
      throw new Error(`Service field ${definition.apiKey} verification failed`)
    }

    verifyAllowedBlocks(field, definition, itemTypes)

    if (
      definition !== isLandingFieldDefinition &&
      field.fieldset?.id !== fieldset.id
    ) {
      throw new Error(
        `Service field ${definition.apiKey} fieldset verification failed`
      )
    }
  }

  const isLanding = serviceFields.find(
    ({ api_key: apiKey }) => apiKey === 'is_landing'
  )
  const staticFields = staticSectionFieldDefinitions.map((definition) =>
    serviceFields.find(({ api_key: apiKey }) => apiKey === definition.apiKey)
  )
  const iconField = await findField(
    client,
    itemTypes.get('service_landing_feature'),
    'icon_key'
  )

  if (isLanding.default_value !== false) {
    throw new Error('Service is_landing default value verification failed')
  }

  if (staticFields.some((field) => !field)) {
    throw new Error('Static landing fields verification failed')
  }

  if (
    staticFields.some(
      (field, index) =>
        index > 0 && field.position <= staticFields[index - 1].position
    )
  ) {
    throw new Error('Static landing field ordering verification failed')
  }

  if (
    iconField.appearance?.editor !== plugin.id ||
    iconField.appearance?.field_extension !== ICON_PICKER_FIELD_EXTENSION ||
    iconField.hint
  ) {
    throw new Error('Service icon picker verification failed')
  }

  console.log('Service landing static schema verified successfully')
}

const run = async () => {
  const client = await createManagementClient()
  const service = await findItemType(client, SERVICE_API_KEY)

  if (!service) {
    throw new Error(`DatoCMS model ${SERVICE_API_KEY} was not found`)
  }

  const plugin = await ensurePlugin(client)
  const itemTypes = new Map()

  for (const definition of blockDefinitions) {
    const itemType = await ensureItemType(client, definition)
    itemTypes.set(definition.apiKey, itemType)
  }

  for (const definition of blockDefinitions) {
    const itemType = itemTypes.get(definition.apiKey)
    const fields = new Map()

    for (const fieldDefinition of definition.fields) {
      const field = await ensureField(
        client,
        itemType,
        fieldDefinition,
        itemTypes
      )
      fields.set(fieldDefinition.apiKey, field)
    }

    const presentationField = fields.get(definition.presentationField)

    if (presentationField) {
      await client.itemTypes.update(itemType, {
        presentation_title_field: presentationField,
      })
    }
  }

  await ensureField(client, service, isLandingFieldDefinition, itemTypes)
  const fieldset = await ensureFieldset(client, service)
  await ensureField(
    client,
    service,
    legacyLandingFieldDefinition,
    itemTypes,
    fieldset
  )

  for (const definition of staticSectionFieldDefinitions) {
    await ensureField(client, service, definition, itemTypes, fieldset)
  }

  await configureIconPicker(client, itemTypes, plugin)
  await verifySchema(client, service, itemTypes, plugin)
  await migrateLegacySections(client, service, itemTypes)
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
