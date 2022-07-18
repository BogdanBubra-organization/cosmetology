import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'

import { Container } from 'react-bootstrap'
import ReviewsList from '~components/ReviewsList'
import * as s from './Reviews.module.scss'
import DATA from './constants'

const Home = () => {
  const { title } = DATA
  return (
    <Layout>
      <S title={title} />
      <Container as="section" className={s.reviews}>
        <h1 className="h2">{title}</h1>
        <ReviewsList className={s.reviews_list} />
      </Container>
    </Layout>
  )
}

export default Home
