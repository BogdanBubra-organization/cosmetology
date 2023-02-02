import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'gatsby'
import CategoriesPreview from '~components/CategoriesPreview'
import * as s from './Categories.module.scss'

const Categories = (props) => {
  const { heading, text, linkText, categoriesList } = props

  return (
    <Container as="section" id="categories" className={s.categories}>
      <div className={s.categories_heading}>
        <h2 data-appear="categories" data-direction="top">
          {heading}
        </h2>

        <p
          data-appear="categories"
          data-direction="top"
          className={s.categories_descr}
        >
          {text}
        </p>
      </div>

      <CategoriesPreview data={categoriesList} />

      <div className={s.categories_btn}>
        <Button
          data-appear="categories"
          data-direction="bottom"
          as={Link}
          to="/services"
          variant="secondary"
        >
          {linkText}
        </Button>
      </div>
    </Container>
  )
}

export default Categories
