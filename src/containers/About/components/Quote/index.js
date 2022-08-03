import React from 'react'
import { Container } from 'react-bootstrap'
import QUOTE from './constants'

import * as s from './Quote.module.scss'

const Quote = () => {
  return (
    <Container as="section" className={s.quote_wrapper}>
      <blockquote cite="cosmetology.ua" className={s.quote}>
        <h2 className={s.quote_title}>{QUOTE}</h2>
      </blockquote>
    </Container>
  )
}

export default Quote
