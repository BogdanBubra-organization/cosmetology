import React from 'react'
import { Container } from 'react-bootstrap'

import * as s from './ServicesHero.module.scss'

const ServicesHero = ({ heading, text }) => {
  return (
    <Container as="section" className={s.serviceshero}>
      <h1 className="h2">{heading}</h1>
      <p className={s.serviceshero_descr}>{text}</p>
    </Container>
  )
}

export default ServicesHero
