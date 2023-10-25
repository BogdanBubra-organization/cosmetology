/* eslint-disable camelcase */
import React from 'react'
import { ElfsightWidget } from 'react-elfsight-widget'
import { Container } from 'react-bootstrap'
import * as s from './Reviews.module.scss'

const Reviews = ({ heading }) => {
  return (
    <Container as="section" id="reviews" className={s.reviews}>
      <h2 data-array="reviews" data-direction="top">
        {heading}
      </h2>

      <ElfsightWidget widgetId="c2c054e8-0360-4335-8ab1-140ee9ad8695" />
    </Container>
  )
}

export default Reviews
