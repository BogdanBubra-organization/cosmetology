import React from 'react'
import { Container } from 'react-bootstrap'
import Brands from '~components/Brands'

import * as s from './Collab.module.scss'

const Collab = () => {
  return (
    <section className={s.collab_wrapper}>
      <Container className={s.collab}>
        <Brands />
      </Container>
    </section>
  )
}

export default Collab
