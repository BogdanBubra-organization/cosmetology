import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import * as s from './Brands.module.scss'

const Brands = ({ title, list }) => {
  return (
    <div className={s.brands}>
      {title && (
        <span className={s.brands_title} data-appear="hero">
          {title}
        </span>
      )}
      <div className={s.brands_list_wrapper}>
        <ul className={s.brands_list} data-array="hero" data-direction="bottom">
          {list?.map(({ name, logo }) => (
            <GatsbyImage
              key={name}
              loading="eager"
              image={getImage(logo)}
              alt={name}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Brands
