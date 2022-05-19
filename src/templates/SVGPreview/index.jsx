import React from 'react'

import * as style from './SVGPreview.module.scss'
import SVGSprite from '~components/SVGSprite'
import S from '~components/seo'

/**
 * SVGPreview component
 */
const SVGPreview = () => {
  return (
    <div className={style.svgPreview}>
      <S title="SVG Preview" />
      <SVGSprite className={style.table} />
    </div>
  )
}

export default SVGPreview
