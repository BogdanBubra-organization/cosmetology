import React from 'react'
import { Container } from 'react-bootstrap'
import Cards from '~components/Cards'
import * as s from './Services.module.scss'

const Services = (props) => {
  const { heading, text, services } = props

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
    </Container>
  )
}

export default Services
