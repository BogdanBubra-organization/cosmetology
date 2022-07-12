import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'

import Reviews from '~containers/Home/components/Reviews'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Gallery from './components/Gallery'

const Home = () => (
  <Layout>
    <S />
    <Hero />
    <Services />
    <Gallery />
    <About />
    <Reviews />
  </Layout>
)

export default Home
