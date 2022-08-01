import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import AboutHero from './components/AboutHero'

const About = () => (
  <Layout>
    <S title="Про нас" />
    <Lights />
    <AboutHero />
  </Layout>
)

export default About
