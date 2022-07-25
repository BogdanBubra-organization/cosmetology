import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Cards from '~components/Cards'
import DATA from './constants'
import * as s from './Services.module.scss'

const Services = () => {
  const { title, descr, btn } = DATA

  const data = useStaticQuery(graphql`
    {
      allServicesJson(
        sort: { fields: jsonId, order: ASC }
        filter: { isHome: { eq: true } }
      ) {
        edges {
          node {
            id
            slug
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

  return (
    <Container as="section" id="services" className={s.services}>
      <div className={s.services_heading}>
        <h2 data-appear="services" data-direction="top">
          {title}
        </h2>
        <p
          data-appear="services"
          data-direction="top"
          className={s.services_descr}
        >
          {descr}
        </p>
      </div>
      <Cards
        data={data.allServicesJson.edges}
        data-array="services"
        data-direction="bottom"
        variant="homepage"
      />
      <div className={s.services_btn}>
        <Button
          data-appear="services"
          data-direction="bottom"
          as={Link}
          to={btn.link}
          variant="secondary"
        >
          {btn.text}
        </Button>
      </div>
    </Container>
  )
}

export default Services
