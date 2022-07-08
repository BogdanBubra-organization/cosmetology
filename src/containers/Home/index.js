import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'

import Reviews from '~components/Reviews'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'

const Home = () => (
  <Layout>
    <S />
    <Hero />
    <Services />
    <About />
    <Reviews isHome />
  </Layout>
)

export default Home
