import React from 'react'
import { Container } from 'react-bootstrap'
import cn from 'classnames'
import Social from '~components/Social'
import * as s from './Messengers.module.scss'

const Messengers = ({ title }) => {
  return (
    <Container as="section" className={s.messengers}>
      <div className={cn(s.messengers_inner, 'animate')}>
        <p className={s.messengers_descr}>{title}</p>
        <Social variant="messengers" />
      </div>
    </Container>
  )
}

export default Messengers
