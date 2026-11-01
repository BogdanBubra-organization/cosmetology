import SEO from '~components/seo'
import React from 'react'

import SVGSprite from '~components/SVGSprite'
import * as style from './SVGPreview.module.scss'

/**
 * SVGPreview component
 */
const SVGPreview = () => {
  return (
    <div className={style.svgPreview}>
      <SVGSprite className={style.table} />
    </div>
  )
}

export default SVGPreview

export const Head = () => <SEO title="SVG Preview" />
