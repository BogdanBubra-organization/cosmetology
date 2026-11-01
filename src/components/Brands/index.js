import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import * as s from './Brands.module.scss'

const Brands = ({ title, list }) => {
  const visibleBrands = list || []

  if (!visibleBrands.length) return null

  return (
    <div className={s.brands}>
      {title && (
        <span className={s.brands_title} data-appear="hero">
          {title}
        </span>
      )}
      <div className={s.brands_list_wrapper}>
        <ul className={s.brands_list} data-array="hero" data-direction="bottom">
          {visibleBrands.map(({ name, logo }) =>
            getImage(logo) ? (
              <GatsbyImage
                key={name}
                loading="eager"
                image={getImage(logo)}
                alt={name}
              />
            ) : (
              <span key={name}>{name}</span>
            )
          )}
        </ul>
      </div>
    </div>
  )
}

export default Brands
