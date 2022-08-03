import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import AboutHero from './components/AboutHero'
import Collab from './components/Collab'
import Founder from './components/Founder'
import Quote from './components/Quote'

const About = () => (
  <Layout>
    <S title="Про нас" />
    <AboutHero />
    <Quote />
    <Founder />
    <Collab />
    <Lights variant="about" />
  </Layout>
)

export default About
