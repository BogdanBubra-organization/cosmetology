import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'

import Hero from './components/Hero'
import Services from './components/Services'

const Home = () => (
  <Layout>
    <S />
    <Hero />
    <Services />
  </Layout>
)

export default Home
