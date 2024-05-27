import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import S from '~components/seo'
import * as s from './Result.module.scss'

const Result = () => {
  return (
    <>
      <S title="Результат" />

      <div className={s.result}>
        <StaticImage
          loading="eager"
          src="./img/shevchyk.jpg"
          alt="Результат"
          className={s.result_pic}
        />
      </div>
    </>
  )
}

export default Result
