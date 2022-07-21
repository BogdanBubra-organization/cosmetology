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
    <Container as="section" className={s.services}>
      <div className={s.services_heading}>
        <h2>{title}</h2>
        <p className={s.services_descr}>{descr}</p>
      </div>
      <Cards data={data.allServicesJson.edges} variant="homepage" />
      <Button
        as={Link}
        to={btn.link}
        className={s.services_btn}
        variant="secondary"
      >
        {btn.text}
      </Button>
    </Container>
  )
}

export default Services
