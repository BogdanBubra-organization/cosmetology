/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { connect } from 'datocms-plugin-sdk'
import { Canvas } from 'datocms-react-ui'
import 'datocms-react-ui/styles.css'

import iconCatalog from '../../../src/service-icons/catalog.json'
import iconSprite from '../../../src/service-icons/icons.svg'
import { filterIcons, getNextIconIndex } from './icon-picker-utils.mjs'
import './style.css'

const FIELD_EXTENSION_ID = 'serviceIconPicker'

const categories = [
  ['all', 'Усі'],
  ['popular', 'Основні'],
  ['medical', 'Медицина'],
  ['beauty', 'Краса й догляд'],
  ['equipment', 'Обладнання'],
  ['comfort', 'Комфорт і безпека'],
  ['location', 'Локація і зв’язок'],
  ['actions', 'Дії та пропозиції'],
]

const Icon = ({ name }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <use href={`${iconSprite}#service-${name}`} />
  </svg>
)

const IconPicker = ({ ctx }) => {
  const formValue = ctx.formValues[ctx.fieldPath] || ''
  const [category, setCategory] = useState('all')
  const [selectedKey, setSelectedKey] = useState(formValue)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)
  const pickerRef = useRef(null)
  const gridRef = useRef(null)
  const selectedIcon = iconCatalog.find(({ key }) => key === selectedKey)
  const visibleIcons = useMemo(
    () => filterIcons(iconCatalog, { category }),
    [category]
  )

  useEffect(() => {
    setSelectedKey(formValue)
  }, [formValue])

  useEffect(() => {
    const picker = pickerRef.current

    if (!picker) return undefined

    const updateHeight = () =>
      ctx.updateHeight(Math.ceil(picker.getBoundingClientRect().bottom))
    const resizeObserver = new ResizeObserver(updateHeight)

    updateHeight()
    resizeObserver.observe(picker)

    return () => resizeObserver.disconnect()
  }, [ctx])

  const selectIcon = async (key) => {
    await ctx.setFieldValue(ctx.fieldPath, key)
    setSelectedKey(key || '')
    setIsCatalogOpen(false)
  }

  const handleGridKeyDown = (event) => {
    if (
      !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
    ) {
      return
    }

    const buttons = Array.from(
      gridRef.current?.querySelectorAll('[data-icon-option]') || []
    )
    const currentIndex = buttons.indexOf(document.activeElement)

    if (currentIndex < 0) return

    const columns = Math.max(
      1,
      Math.round(
        gridRef.current.clientWidth / buttons[currentIndex].offsetWidth
      )
    )
    const nextIndex = getNextIconIndex({
      currentIndex,
      itemCount: buttons.length,
      columns,
      key: event.key,
    })

    if (nextIndex !== currentIndex) {
      event.preventDefault()
      buttons[nextIndex].focus()
    }
  }

  return (
    <Canvas ctx={ctx} noAutoResizer>
      <div className="picker" ref={pickerRef}>
        {selectedKey && (
          <div className="picker__selected" aria-live="polite">
            {selectedIcon ? <Icon name={selectedIcon.key} /> : null}
            <div className="picker__selected-copy">
              <span>Вибрана іконка</span>
              <strong>
                {selectedIcon?.labelUk || `Невідома іконка: ${selectedKey}`}
              </strong>
            </div>
            <div className="picker__selected-actions">
              <button
                type="button"
                aria-expanded={isCatalogOpen}
                aria-controls="service-icon-catalog"
                onClick={() => setIsCatalogOpen((isOpen) => !isOpen)}
              >
                {isCatalogOpen ? 'Сховати' : 'Змінити'}
              </button>
              <button type="button" onClick={() => selectIcon(null)}>
                Очистити
              </button>
            </div>
          </div>
        )}

        {!selectedKey && (
          <div className="picker__empty-selection">
            <span>Іконку не вибрано</span>
            <button
              type="button"
              aria-expanded={isCatalogOpen}
              aria-controls="service-icon-catalog"
              onClick={() => setIsCatalogOpen((isOpen) => !isOpen)}
            >
              {isCatalogOpen ? 'Скасувати' : 'Обрати'}
            </button>
          </div>
        )}

        {isCatalogOpen && (
          <div className="picker__catalog" id="service-icon-catalog">
            <div className="picker__categories" aria-label="Категорії іконок">
              {categories.map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  className={category === value ? 'is-active' : ''}
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            {visibleIcons.length ? (
              <div
                className="picker__grid"
                ref={gridRef}
                role="grid"
                aria-label="Іконки"
                tabIndex={-1}
                onKeyDown={handleGridKeyDown}
              >
                {visibleIcons.map((icon) => (
                  <button
                    type="button"
                    key={icon.key}
                    data-icon-option
                    className={selectedKey === icon.key ? 'is-selected' : ''}
                    aria-pressed={selectedKey === icon.key}
                    title={`${icon.labelUk} — ${icon.labelEn}`}
                    onClick={() => selectIcon(icon.key)}
                  >
                    <Icon name={icon.key} />
                    <span>{icon.labelUk}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="picker__empty">У цій категорії немає іконок.</p>
            )}
          </div>
        )}
      </div>
    </Canvas>
  )
}

const root = createRoot(document.getElementById('root'))

connect({
  manualFieldExtensions() {
    return [
      {
        id: FIELD_EXTENSION_ID,
        name: 'Service icon picker',
        type: 'editor',
        fieldTypes: ['string'],
      },
    ]
  },
  renderFieldExtension(fieldExtensionId, ctx) {
    if (fieldExtensionId === FIELD_EXTENSION_ID) {
      root.render(<IconPicker ctx={ctx} />)
    }
  },
})
