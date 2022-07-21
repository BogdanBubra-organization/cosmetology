import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Container } from 'react-bootstrap'
import Category from './components/Category'
import CATEGORIES from './constants'

import * as s from './ServicesList.module.scss'

const ServicesList = () => {
  const data = useStaticQuery(graphql`
    {
      allServicesJson(sort: { fields: id, order: ASC }) {
        edges {
          node {
            id
            slug
            category
            name
            duration
            preview {
              publicURL
            }
          }
        }
      }
    }
  `)

  const listByCategories = CATEGORIES.map((category) => ({
    category,
    list: data?.allServicesJson.edges.filter(
      ({ node }) => node.category === category.name
    ),
  }))

  return (
    <Container as="section" className={s.serviceslist}>
      {listByCategories.map((el) => (
        <Category key={el.category.name} {...el} />
      ))}
    </Container>
  )
}

export default ServicesList
