export const normalizeSearchText = (value) =>
  value.toLocaleLowerCase('uk-UA').normalize('NFKD').replace(/[’']/g, '')

export const filterIcons = (catalog, { category = 'all', query = '' } = {}) => {
  const normalizedQuery = normalizeSearchText(query.trim())

  return catalog.filter((icon) => {
    if (category !== 'all' && icon.category !== category) return false
    if (!normalizedQuery) return true

    return normalizeSearchText(
      [icon.key, icon.labelUk, icon.labelEn, icon.keywords].join(' ')
    ).includes(normalizedQuery)
  })
}

export const getNextIconIndex = ({ currentIndex, itemCount, columns, key }) => {
  const offset = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -columns,
    ArrowDown: columns,
  }[key]

  if (offset === undefined || currentIndex < 0 || itemCount < 1) {
    return currentIndex
  }

  return Math.min(itemCount - 1, Math.max(0, currentIndex + offset))
}
