import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'
import ServicesHero from './components/ServicesHero'
import ServicesList from './components/ServicesList'

const Services = () => (
  <Layout>
    <S title="Послуги" />
    <ServicesHero />
    <ServicesList />
  </Layout>
)

export default Services
