/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */
import {
  SERVICE_API_KEY,
  createManagementClient,
  findField,
  findItemType,
  sectionBlockDefinitions,
  staticSectionFieldDefinitions,
} from './service-landing-schema.mjs'
import { verifyStaticSections } from './service-landing-migration.mjs'

const run = async () => {
  const client = await createManagementClient()
  const service = await findItemType(client, SERVICE_API_KEY)

  if (!service) {
    throw new Error(`DatoCMS model ${SERVICE_API_KEY} was not found`)
  }

  const itemTypes = new Map()

  for (const definition of sectionBlockDefinitions) {
    const itemType = await findItemType(client, definition.apiKey)

    if (!itemType) {
      throw new Error(`Missing block model ${definition.apiKey}`)
    }

    itemTypes.set(definition.apiKey, itemType)
  }

  for (const definition of staticSectionFieldDefinitions) {
    const field = await findField(client, service, definition.apiKey)

    if (!field || field.field_type !== 'single_block') {
      throw new Error(`Missing static field Service.${definition.apiKey}`)
    }
  }

  const legacyField = await findField(client, service, 'landing_sections')

  if (!legacyField) {
    await verifyStaticSections(client, service, itemTypes)
    await verifyStaticSections(client, service, itemTypes, {
      version: 'published',
    })
    console.log('landing_sections is already finalized')
    return
  }

  await verifyStaticSections(client, service, itemTypes, {
    requireLegacy: true,
  })
  await verifyStaticSections(client, service, itemTypes, {
    requireLegacy: true,
    version: 'published',
  })

  await client.fields.destroy(legacyField)
  console.log('Deleted Service.landing_sections after content verification')

  await verifyStaticSections(client, service, itemTypes)
  await verifyStaticSections(client, service, itemTypes, {
    version: 'published',
  })
  console.log('Service landing static migration finalized successfully')
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
