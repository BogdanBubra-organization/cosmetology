/* eslint-disable camelcase */
import React from 'react'
import { ElfsightWidget } from 'react-elfsight-widget'
import { Container } from 'react-bootstrap'
import cn from 'classnames'
import * as s from './Reviews.module.scss'

const Reviews = ({ variant }) => {
  return (
    <Container
      as="section"
      id="reviews"
      className={cn(s.reviews, { [s[variant]]: variant })}
    >
      <h2 className={s.reviews_title}>Відгуки</h2>

      <ElfsightWidget widgetId="c2c054e8-0360-4335-8ab1-140ee9ad8695" />
    </Container>
  )
}

export default Reviews
