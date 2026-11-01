import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import * as s from './Result.module.scss'

const Result = () => {
  return (
    <div className={s.result}>
      <StaticImage
        loading="eager"
        src="./img/shevchyk.jpg"
        alt="Результат"
        className={s.result_pic}
      />
    </div>
  )
}

export default Result
