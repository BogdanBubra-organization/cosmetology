import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'

import { Container } from 'react-bootstrap'
import ReviewsList from '~components/ReviewsList'
import * as s from './Reviews.module.scss'

const Reviews = ({ heading, reviews }) => (
  <Layout>
    <S title={heading} />
    <Container as="section" className={s.reviews}>
      <h1 className="h2">{heading}</h1>
      <ReviewsList reviews={reviews} className={s.reviews_list} />
    </Container>
  </Layout>
)

export default Reviews
