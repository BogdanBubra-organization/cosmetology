import React from 'react'
import Cards from '~components/Cards'

import * as s from './SameProducts.module.scss'

const SameProducts = ({ list }) => {
  return (
    <section className={s.sameproducts}>
      <h2 className={s.sameproducts_title}>
        Інші процедури які можуть вас зацікавити
      </h2>
      <Cards data={list} />
    </section>
  )
}

export default SameProducts
