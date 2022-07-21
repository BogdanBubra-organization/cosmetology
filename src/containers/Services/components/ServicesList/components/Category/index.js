import React from 'react'
import Cards from '~components/Cards'

import * as s from './Category.module.scss'

const Category = ({ category, list }) => {
  return (
    <div className={s.category}>
      <h4>{category.title}</h4>
      <p className={s.category_descr}>{category.description}</p>
      <Cards data={list} />
    </div>
  )
}

export default Category
