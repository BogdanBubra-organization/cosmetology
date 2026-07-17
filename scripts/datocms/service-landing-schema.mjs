/* eslint-disable import/no-extraneous-dependencies */
import 'dotenv/config'

import { buildClient } from '@datocms/cma-client-node'
import { readFileSync } from 'node:fs'

export const SANDBOX_ENVIRONMENT = 'main-copy-2026-07-15'
export const SERVICE_API_KEY = 'service'
export const LANDING_FIELDSET_TITLE = 'Landing page'
export const ICON_PICKER_PLUGIN_NAME = 'Service icon picker'
export const ICON_PICKER_FIELD_EXTENSION = 'serviceIconPicker'

export const iconCatalog = JSON.parse(
  readFileSync(new URL('../../src/service-icons/catalog.json', import.meta.url))
)

const iconOptions = iconCatalog.map(({ key, labelUk, labelEn }) => [
  key,
  `${labelUk} — ${labelEn}`,
])

const stringField = (apiKey, label, extra = {}) => ({
  apiKey,
  label,
  fieldType: 'string',
  appearance: {
    editor: 'single_line',
    parameters: { heading: false, placeholder: null },
    addons: [],
  },
  ...extra,
})

const textField = (apiKey, label, extra = {}) => ({
  apiKey,
  label,
  fieldType: 'text',
  appearance: {
    editor: 'textarea',
    parameters: { placeholder: null },
    addons: [],
  },
  ...extra,
})

const structuredTextField = (apiKey, label, extra = {}) => ({
  apiKey,
  label,
  fieldType: 'structured_text',
  validators: {
    structured_text_blocks: { item_types: [] },
    structured_text_links: {
      on_publish_with_unpublished_references_strategy: 'fail',
      on_reference_unpublish_strategy: 'delete_references',
      on_reference_delete_strategy: 'delete_references',
      item_types: [],
    },
    structured_text_inline_blocks: { item_types: [] },
  },
  appearance: {
    editor: 'structured_text',
    parameters: {
      marks: ['strong', 'emphasis', 'underline', 'strikethrough'],
      nodes: ['link', 'list', 'thematicBreak'],
      heading_levels: [3, 4, 5, 6],
      blocks_start_collapsed: false,
      show_links_meta_editor: false,
      show_links_target_blank: true,
    },
    addons: [],
  },
  ...extra,
})

const fileField = (apiKey, label, extra = {}) => ({
  apiKey,
  label,
  fieldType: 'file',
  appearance: { editor: 'file', parameters: {}, addons: [] },
  ...extra,
})

const galleryField = (apiKey, label, extra = {}) => ({
  apiKey,
  label,
  fieldType: 'gallery',
  appearance: { editor: 'gallery', parameters: {}, addons: [] },
  ...extra,
})

const integerField = (apiKey, label, extra = {}) => ({
  apiKey,
  label,
  fieldType: 'integer',
  appearance: {
    editor: 'integer',
    parameters: { placeholder: null },
    addons: [],
  },
  ...extra,
})

const modularField = (apiKey, label, allowedBlocks, extra = {}) => ({
  apiKey,
  label,
  fieldType: 'rich_text',
  allowedBlocks,
  appearance: {
    editor: 'rich_text',
    parameters: { start_collapsed: true },
    addons: [],
  },
  ...extra,
})

const singleBlockField = (apiKey, label, allowedBlock, extra = {}) => ({
  apiKey,
  label,
  fieldType: 'single_block',
  allowedBlocks: [allowedBlock],
  appearance: {
    editor: 'framed_single_block',
    parameters: { start_collapsed: true },
    addons: [],
  },
  ...extra,
})

const titleAndDescription = () => [
  stringField('title', 'Заголовок'),
  structuredTextField('description', 'Опис'),
]

export const helperBlockDefinitions = [
  {
    apiKey: 'service_landing_feature',
    name: 'Service landing - Feature',
    presentationField: 'title',
    fields: [
      stringField('icon_key', 'Іконка', {
        validators: { enum: { values: iconOptions.map(([value]) => value) } },
        appearance: {
          editor: 'string_select',
          parameters: {
            options: iconOptions.map(([value, label]) => ({
              label,
              value,
              hint: '',
            })),
          },
          addons: [],
        },
      }),
      stringField('title', 'Заголовок'),
      textField('text', 'Текст'),
    ],
  },
  {
    apiKey: 'service_landing_list_item',
    name: 'Service landing - List item',
    presentationField: 'text',
    fields: [textField('text', 'Текст')],
  },
  {
    apiKey: 'service_landing_price_item',
    name: 'Service landing - Price item',
    presentationField: 'title',
    fields: [
      stringField('title', 'Назва'),
      stringField('price', 'Ціна'),
      stringField('previous_price', 'Попередня ціна'),
      textField('note', 'Примітка'),
    ],
  },
  {
    apiKey: 'service_landing_price_category',
    name: 'Service landing - Price category',
    presentationField: 'title',
    fields: [
      stringField('title', 'Назва категорії'),
      modularField('items', 'Позиції', ['service_landing_price_item']),
    ],
  },
  {
    apiKey: 'service_landing_doctor',
    name: 'Service landing - Doctor',
    presentationField: 'name',
    fields: [
      fileField('photo', 'Фото'),
      stringField('name', "Ім'я"),
      stringField('specialty', 'Спеціальність'),
      textField('description', 'Короткий опис'),
      stringField('cta_label', 'Текст кнопки запису'),
    ],
  },
  {
    apiKey: 'service_landing_review',
    name: 'Service landing - Review',
    presentationField: 'name',
    fields: [
      fileField('photo', 'Фото клієнта'),
      stringField('name', "Ім'я"),
      integerField('rating', 'Рейтинг', {
        validators: { number_range: { min: 1, max: 5 } },
      }),
      textField('text', 'Текст відгуку'),
    ],
  },
]

export const sectionBlockDefinitions = [
  {
    apiKey: 'service_landing_hero',
    name: 'Service landing - Hero',
    presentationField: 'title',
    fields: [
      ...titleAndDescription(),
      fileField('image', 'Зображення'),
      stringField('badge', 'Badge'),
      stringField('primary_cta_label', 'Текст кнопки запису'),
      stringField('price_cta_label', 'Текст кнопки переходу до цін'),
      modularField('features', 'Переваги', ['service_landing_feature']),
    ],
  },
  {
    apiKey: 'service_landing_about',
    name: 'Service landing - About',
    presentationField: 'title',
    fields: [
      ...titleAndDescription(),
      modularField('features', 'Переваги', ['service_landing_feature']),
    ],
  },
  {
    apiKey: 'service_landing_price_section',
    name: 'Service landing - Prices',
    presentationField: 'title',
    fields: [
      ...titleAndDescription(),
      modularField('categories', 'Категорії цін', [
        'service_landing_price_category',
      ]),
      textField('note', 'Примітка'),
    ],
  },
  {
    apiKey: 'service_landing_equipment',
    name: 'Service landing - Additional information',
    presentationField: 'title',
    fields: [
      ...titleAndDescription(),
      fileField('image', 'Зображення'),
      modularField('features', 'Переваги', ['service_landing_feature']),
    ],
  },
  {
    apiKey: 'service_landing_results_section',
    name: 'Service landing - Examples',
    presentationField: 'title',
    fields: [...titleAndDescription(), galleryField('gallery', 'Галерея')],
  },
  {
    apiKey: 'service_landing_doctor_section',
    name: 'Service landing - Doctors',
    presentationField: 'title',
    fields: [
      ...titleAndDescription(),
      modularField('doctors', 'Лікарі', ['service_landing_doctor']),
    ],
  },
  {
    apiKey: 'service_landing_certificate_section',
    name: 'Service landing - Certificates',
    presentationField: 'title',
    fields: [...titleAndDescription(), galleryField('gallery', 'Сертифікати')],
  },
  {
    apiKey: 'service_landing_preparation',
    name: 'Service landing - Preparation',
    presentationField: 'title',
    fields: [
      ...titleAndDescription(),
      modularField('items', 'Рекомендації', ['service_landing_list_item']),
    ],
  },
  {
    apiKey: 'service_landing_contraindication_section',
    name: 'Service landing - Contraindications',
    presentationField: 'title',
    fields: [
      ...titleAndDescription(),
      modularField('items', 'Протипоказання', ['service_landing_list_item']),
      textField('note', 'Примітка'),
    ],
  },
  {
    apiKey: 'service_landing_clinic_gallery',
    name: 'Service landing - Clinic gallery',
    presentationField: 'title',
    fields: [
      ...titleAndDescription(),
      galleryField('gallery', 'Галерея клініки'),
    ],
  },
  {
    apiKey: 'service_landing_review_section',
    name: 'Service landing - Reviews',
    presentationField: 'title',
    fields: [
      ...titleAndDescription(),
      modularField('reviews', 'Відгуки', ['service_landing_review']),
    ],
  },
  {
    apiKey: 'service_landing_final_cta',
    name: 'Service landing - Final CTA',
    presentationField: 'title',
    fields: [
      ...titleAndDescription(),
      fileField('image', 'Зображення'),
      stringField('badge', 'Badge'),
      stringField('appointment_label', 'Текст кнопки запису'),
      stringField('telegram_label', 'Текст кнопки Telegram'),
      stringField('telegram_url', 'Посилання Telegram', {
        validators: { format: { predefined_pattern: 'url' } },
      }),
      stringField('viber_label', 'Текст кнопки Viber'),
      stringField('viber_url', 'Посилання Viber', {
        validators: { format: { predefined_pattern: 'url' } },
      }),
    ],
  },
]

export const blockDefinitions = [
  ...helperBlockDefinitions,
  ...sectionBlockDefinitions,
]

export const isLandingFieldDefinition = {
  apiKey: 'is_landing',
  label: 'Landing',
  fieldType: 'boolean',
  defaultValue: false,
  hint: 'Увімкніть лише після заповнення Landing page.',
  appearance: { editor: 'boolean', parameters: {}, addons: [] },
}

export const legacyLandingFieldDefinition = modularField(
  'landing_sections',
  'Секції landing-сторінки',
  sectionBlockDefinitions.map(({ apiKey }) => apiKey),
  {
    hint: 'Додавайте секції у потрібному порядку. Порожні секції не відображаються.',
  }
)

export const staticSectionFieldDefinitions = [
  singleBlockField('landing_hero', 'Головний екран', 'service_landing_hero'),
  singleBlockField('landing_about', 'Про процедуру', 'service_landing_about'),
  singleBlockField('landing_prices', 'Ціни', 'service_landing_price_section'),
  singleBlockField(
    'landing_equipment',
    'Додаткова інформація',
    'service_landing_equipment'
  ),
  singleBlockField(
    'landing_results',
    'Приклади',
    'service_landing_results_section'
  ),
  singleBlockField(
    'landing_doctors',
    'Лікарі',
    'service_landing_doctor_section'
  ),
  singleBlockField(
    'landing_certificates',
    'Сертифікати',
    'service_landing_certificate_section'
  ),
  singleBlockField(
    'landing_preparation',
    'Підготовка',
    'service_landing_preparation'
  ),
  singleBlockField(
    'landing_contraindications',
    'Протипоказання',
    'service_landing_contraindication_section'
  ),
  singleBlockField(
    'landing_clinic_gallery',
    'Галерея клініки',
    'service_landing_clinic_gallery'
  ),
  singleBlockField(
    'landing_reviews',
    'Відгуки',
    'service_landing_review_section'
  ),
  singleBlockField(
    'landing_final_cta',
    'Фінальний заклик',
    'service_landing_final_cta'
  ),
]

export const serviceFieldDefinitions = [
  isLandingFieldDefinition,
  legacyLandingFieldDefinition,
  ...staticSectionFieldDefinitions,
]

export const sectionFieldByBlockApiKey = new Map(
  staticSectionFieldDefinitions.map((definition) => [
    definition.allowedBlocks[0],
    definition.apiKey,
  ])
)

export const createManagementClient = async () => {
  const apiToken = process.env.DATOCMS_MANAGEMENT_API_TOKEN
  const environment = process.env.DATOCMS_ENVIRONMENT

  if (!apiToken) {
    throw new Error('DATOCMS_MANAGEMENT_API_TOKEN is required')
  }

  if (environment !== SANDBOX_ENVIRONMENT) {
    throw new Error(
      `DATOCMS_ENVIRONMENT must be exactly ${SANDBOX_ENVIRONMENT}`
    )
  }

  const client = buildClient({ apiToken, environment })
  const environments = await client.environments.list()
  const targetEnvironment = environments.find(({ id }) => id === environment)

  if (!targetEnvironment) {
    throw new Error(`DatoCMS environment ${environment} does not exist`)
  }

  if (targetEnvironment.meta.primary) {
    throw new Error(
      'Schema scripts must never run against the primary environment'
    )
  }

  return client
}

export const findItemType = async (client, apiKey) => {
  const itemTypes = await client.itemTypes.list()
  return itemTypes.find((itemType) => itemType.api_key === apiKey)
}

export const findField = async (client, itemType, apiKey) => {
  const fields = await client.fields.list(itemType)
  return fields.find((field) => field.api_key === apiKey)
}

export const fieldPayload = (definition, itemTypes, fieldset = null) => {
  const payload = {
    label: definition.label,
    field_type: definition.fieldType,
    api_key: definition.apiKey,
    localized: false,
    validators: definition.validators || {},
    appearance: definition.appearance,
    hint: definition.hint || null,
  }

  if (definition.defaultValue !== undefined) {
    payload.default_value = definition.defaultValue
  }

  if (definition.allowedBlocks && definition.fieldType === 'rich_text') {
    payload.validators = {
      rich_text_blocks: {
        item_types: definition.allowedBlocks.map((apiKey) => {
          const itemType = itemTypes.get(apiKey)

          if (!itemType) {
            throw new Error(`Missing block model ${apiKey}`)
          }

          return itemType.id
        }),
      },
    }
  }

  if (definition.allowedBlocks && definition.fieldType === 'single_block') {
    payload.validators = {
      single_block_blocks: {
        item_types: definition.allowedBlocks.map((apiKey) => {
          const itemType = itemTypes.get(apiKey)

          if (!itemType) {
            throw new Error(`Missing block model ${apiKey}`)
          }

          return itemType.id
        }),
      },
    }
  }

  if (fieldset) {
    payload.fieldset = fieldset
  }

  return payload
}

export const hasLandingContent = (value) =>
  (Array.isArray(value) && value.length > 0) ||
  (value !== null && value !== undefined && value !== false)
