/* eslint-disable no-console */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import {
  filterIcons,
  getNextIconIndex,
} from '../../plugins/dato-icon-picker/src/icon-picker-utils.mjs'

const catalog = JSON.parse(
  readFileSync(new URL('../../src/service-icons/catalog.json', import.meta.url))
)
const sprite = readFileSync(
  new URL('../../src/service-icons/icons.svg', import.meta.url),
  'utf8'
)
const legacyKeys = [
  'cooling',
  'medical',
  'equipment',
  'location',
  'comfort',
  'speed',
  'safety',
  'skin',
  'check',
]

assert.equal(catalog.length, 120)
assert.equal(sprite.match(/<symbol\b/g)?.length, 120)
assert.equal(sprite.match(/<svg\b/g)?.length, 1)
assert.equal(filterIcons(catalog, { query: 'Охолодження' })[0]?.key, 'cooling')
assert.equal(filterIcons(catalog, { query: 'Medical' })[0]?.key, 'medical')
assert.ok(
  filterIcons(catalog, { category: 'beauty' }).every(
    ({ category }) => category === 'beauty'
  )
)
assert.ok(legacyKeys.every((key) => catalog.some((icon) => icon.key === key)))
assert.equal(
  getNextIconIndex({
    currentIndex: 5,
    itemCount: 12,
    columns: 4,
    key: 'ArrowDown',
  }),
  9
)
assert.equal(
  getNextIconIndex({
    currentIndex: 0,
    itemCount: 12,
    columns: 4,
    key: 'ArrowLeft',
  }),
  0
)

console.log('Service icon picker tests passed')
