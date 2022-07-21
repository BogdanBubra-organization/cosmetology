import React from 'react'
import { Container } from 'react-bootstrap'
import DATA from './constants'

import * as s from './ServicesHero.module.scss'

const ServicesHero = () => {
  return (
    <Container as="section" className={s.serviceshero}>
      <h1 className="h2">{DATA.title}</h1>
      <p className={s.serviceshero_descr}>{DATA.descr}</p>
    </Container>
  )
}

export default ServicesHero
