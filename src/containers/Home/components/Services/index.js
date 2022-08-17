import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'gatsby'
import Cards from '~components/Cards'
import * as s from './Services.module.scss'

const Services = (props) => {
  const { heading, text, services, link } = props

  return (
    <Container as="section" id="services" className={s.services}>
      <div className={s.services_heading}>
        <h2 data-appear="services" data-direction="top">
          {heading}
        </h2>
        <p
          data-appear="services"
          data-direction="top"
          className={s.services_descr}
        >
          {text}
        </p>
      </div>
      <Cards
        data={services}
        data-array="services"
        data-direction="bottom"
        variant="homepage"
      />
      <div className={s.services_btn}>
        <Button
          data-appear="services"
          data-direction="bottom"
          as={Link}
          to="/services"
          variant="secondary"
        >
          {link}
        </Button>
      </div>
    </Container>
  )
}

export default Services
