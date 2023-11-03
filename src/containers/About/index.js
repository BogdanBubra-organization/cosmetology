import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import AboutHero from './components/AboutHero'
import Collab from './components/Collab'
import Founder from './components/Founder'
import Quote from './components/Quote'
import Experts from './components/Experts'

const About = ({ hero, quote, cosmetician, brands, experts }) => (
  <Layout>
    <S title="Про нас" />
    <AboutHero {...hero[0]} />
    <Quote data={quote} />
    <Founder {...cosmetician[0]} />
    <Collab brands={brands} />
    <Experts {...experts[0]} />
    <Lights variant="about" />
  </Layout>
)

export default About
