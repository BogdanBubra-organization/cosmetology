import React, { useState } from 'react'
import cn from 'classnames'
import { Collapse } from 'react-bootstrap'
import Cards from '~components/Cards'
import useMatchMedia from '~hooks/useMatchMedia'

import * as s from './Category.module.scss'

const Category = ({ category, list }) => {
  const [open, setOpen] = useState(true)
  const isMobile = useMatchMedia('(max-width: 767px)')

  return (
    <div className={cn(s.category, { [s.show]: !isMobile || open })}>
      {isMobile ? (
        <button
          type="button"
          className={s.category_collapseBtn}
          onClick={() => setOpen((prev) => !prev)}
        >
          <h4>{category.title}</h4>
        </button>
      ) : (
        <h4>{category.title}</h4>
      )}

      <Collapse in={!isMobile || open}>
        <div className={s.category_wrapper}>
          <p className={s.category_descr}>{category.description}</p>
          <Cards data={list} variant="cards" />
        </div>
      </Collapse>
    </div>
  )
}

export default Category
