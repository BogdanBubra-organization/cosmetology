/* eslint-disable import/no-extraneous-dependencies, no-await-in-loop, no-console, no-restricted-syntax, no-underscore-dangle, no-continue, no-use-before-define */
import {
  SchemaRepository,
  duplicateBlockRecord,
} from '@datocms/cma-client-node'

import {
  sectionFieldByBlockApiKey,
  staticSectionFieldDefinitions,
} from './service-landing-schema.mjs'

const blockApiKey = (block, itemTypesById) =>
  itemTypesById.get(block?.__itemTypeId)?.api_key

const normalizeBlock = (value) => {
  if (Array.isArray(value)) return value.map(normalizeBlock)
  if (!value || typeof value !== 'object') return value

  const isBlock = Boolean(value.__itemTypeId)

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !(isBlock && ['id', 'meta'].includes(key)))
      .map(([key, fieldValue]) => [key, normalizeBlock(fieldValue)])
  )
}

const sameBlockContent = (first, second) =>
  JSON.stringify(normalizeBlock(first)) ===
  JSON.stringify(normalizeBlock(second))

const itemTypesById = (itemTypes) =>
  new Map([...itemTypes.values()].map((itemType) => [itemType.id, itemType]))

export const listServiceRecords = async (
  client,
  service,
  version = 'current'
) => {
  const records = []

  for await (const record of client.items.listPagedIterator({
    filter: { type: service.id },
    nested: true,
    version,
  })) {
    records.push(record)
  }

  return records
}

export const preflightStaticMigration = async (client, service, itemTypes) => {
  const records = await listServiceRecords(client, service)
  const typesById = itemTypesById(itemTypes)
  const errors = []

  for (const record of records) {
    const sections = record.landing_sections || []
    const counts = new Map()

    for (const section of sections) {
      const apiKey = blockApiKey(section, typesById)
      const fieldApiKey = sectionFieldByBlockApiKey.get(apiKey)

      if (!fieldApiKey) {
        errors.push(
          `Service ${record.id} contains unsupported landing block ${
            apiKey || section.id
          }`
        )
        continue
      }

      counts.set(apiKey, (counts.get(apiKey) || 0) + 1)

      const currentStaticSection = record[fieldApiKey]
      const currentStaticType = blockApiKey(currentStaticSection, typesById)

      if (currentStaticSection && currentStaticType !== apiKey) {
        errors.push(
          `Service ${record.id} ${fieldApiKey} contains ${currentStaticType}, expected ${apiKey}`
        )
      }
    }

    for (const [apiKey, count] of counts) {
      if (count > 1) {
        errors.push(
          `Service ${record.id} contains ${count} top-level ${apiKey} blocks`
        )
      }
    }
  }

  if (errors.length) {
    throw new Error(
      `Static migration preflight failed:\n- ${errors.join('\n- ')}`
    )
  }

  console.log(
    `Static migration preflight passed for ${records.length} Services`
  )
  return records
}

export const migrateLegacySections = async (client, service, itemTypes) => {
  const records = await preflightStaticMigration(client, service, itemTypes)
  const typesById = itemTypesById(itemTypes)
  const schemaRepository = new SchemaRepository(client)
  let migratedRecords = 0

  for (const record of records) {
    const changes = {}

    for (const section of record.landing_sections || []) {
      const apiKey = blockApiKey(section, typesById)
      const fieldApiKey = sectionFieldByBlockApiKey.get(apiKey)

      if (!record[fieldApiKey]) {
        changes[fieldApiKey] = await duplicateBlockRecord(
          section,
          schemaRepository
        )
      }
    }

    if (!Object.keys(changes).length) continue

    const updated = await client.items.update(record, changes)

    if (record.meta.status === 'published') {
      await client.items.publish(updated)
    }

    migratedRecords += 1
    console.log(`Migrated static landing sections for Service ${record.id}`)
  }

  await verifyStaticSections(client, service, itemTypes, {
    requireLegacy: true,
  })
  console.log(
    `Static landing migration completed for ${migratedRecords} Services`
  )
}

export const verifyStaticSections = async (
  client,
  service,
  itemTypes,
  { requireLegacy = false, version = 'current' } = {}
) => {
  const records = await listServiceRecords(client, service, version)
  const typesById = itemTypesById(itemTypes)

  for (const record of records) {
    const legacySections = record.landing_sections || []

    if (requireLegacy && !Array.isArray(record.landing_sections)) {
      throw new Error(
        `${version} Service ${record.id} is missing landing_sections`
      )
    }

    for (const definition of staticSectionFieldDefinitions) {
      const staticSection = record[definition.apiKey]

      if (!staticSection) continue

      const expectedType = definition.allowedBlocks[0]
      const actualType = blockApiKey(staticSection, typesById)

      if (actualType !== expectedType) {
        throw new Error(
          `${version} Service ${record.id} ${definition.apiKey} contains ${actualType}, expected ${expectedType}`
        )
      }
    }

    for (const legacySection of legacySections) {
      const apiKey = blockApiKey(legacySection, typesById)
      const fieldApiKey = sectionFieldByBlockApiKey.get(apiKey)
      const staticSection = record[fieldApiKey]

      if (!staticSection) {
        throw new Error(
          `${version} Service ${record.id} is missing migrated ${fieldApiKey}`
        )
      }

      if (!sameBlockContent(legacySection, staticSection)) {
        throw new Error(
          `${version} Service ${record.id} ${fieldApiKey} content differs from landing_sections`
        )
      }
    }
  }

  console.log(
    `Verified ${records.length} ${version} Services${
      requireLegacy ? ' against landing_sections' : ''
    }`
  )
}

export const restoreLegacySections = async (client, service, itemTypes) => {
  const records = await listServiceRecords(client, service)
  const schemaRepository = new SchemaRepository(client)
  let restoredRecords = 0

  for (const record of records) {
    if ((record.landing_sections || []).length) continue

    const sections = []

    for (const definition of staticSectionFieldDefinitions) {
      const staticSection = record[definition.apiKey]

      if (staticSection) {
        sections.push(
          await duplicateBlockRecord(staticSection, schemaRepository)
        )
      }
    }

    if (!sections.length) continue

    const updated = await client.items.update(record, {
      landing_sections: sections,
    })

    if (record.meta.status === 'published') {
      await client.items.publish(updated)
    }

    restoredRecords += 1
    console.log(`Restored landing_sections for Service ${record.id}`)
  }

  await verifyStaticSections(client, service, itemTypes, {
    requireLegacy: true,
  })
  console.log(
    `Legacy landing restoration completed for ${restoredRecords} Services`
  )
}
