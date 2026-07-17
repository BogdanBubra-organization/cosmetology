const INTERNAL_KEYS = new Set(['__typename', 'id'])

const hasDocumentText = (node) => {
  if (!node) return false
  if (typeof node === 'string') return Boolean(node.trim())
  if (Array.isArray(node)) return node.some(hasDocumentText)
  if (typeof node !== 'object') return false

  if (typeof node.value === 'string' && node.value.trim()) return true

  return Object.entries(node).some(
    ([key, value]) =>
      !['schema', 'type'].includes(key) && hasDocumentText(value)
  )
}

export const hasStructuredText = (field) =>
  hasDocumentText(field?.value?.document)

export const hasContent = (value) => {
  if (value === null || value === undefined || value === false) return false
  if (typeof value === 'string') return Boolean(value.trim())
  if (typeof value === 'number') return true
  if (Array.isArray(value)) return value.some(hasContent)
  if (typeof value !== 'object') return false

  if ('value' in value && value.value?.document) {
    return hasStructuredText(value)
  }

  if ('gatsbyImageData' in value) {
    return Boolean(value.gatsbyImageData)
  }

  return Object.entries(value).some(
    ([key, fieldValue]) => !INTERNAL_KEYS.has(key) && hasContent(fieldValue)
  )
}

export const compactContent = (items) => (items || []).filter(hasContent)

export const textContent = (value) =>
  typeof value === 'string' ? value.trim() : ''

export const safeUrl = (value, allowedProtocols = ['http:', 'https:']) => {
  const normalizedValue = textContent(value)

  if (!normalizedValue) return ''

  try {
    const url = new URL(normalizedValue)
    return allowedProtocols.includes(url.protocol) ? normalizedValue : ''
  } catch {
    return ''
  }
}

export const hasFeatureContent = ({ title, text } = {}) =>
  Boolean(textContent(title)) || Boolean(textContent(text))

export const hasReviewContent = (review = {}) =>
  hasContent({
    ...review,
    rating:
      Number.isFinite(review.rating) && review.rating > 0
        ? review.rating
        : null,
  })

export const mediaAlt = (media, fallback) =>
  textContent(media?.alt) || textContent(media?.title) || textContent(fallback)
