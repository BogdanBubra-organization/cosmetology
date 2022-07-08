import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'

import Reviews from '~components/Reviews'

const Home = () => (
  <Layout>
    <S title="Відгуки" />
    <Reviews />
  </Layout>
)

export default Home
