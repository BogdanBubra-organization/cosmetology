import React from 'react'
import { Container } from 'react-bootstrap'

import Layout from '~components/Layout'
import S from '~components/seo'
import ServicesHero from './components/ServicesHero'
import Category from './components/Category'
import * as s from './Services.module.scss'

const Services = (props) => {
  const {
    heading,
    text,
    injectionsCosmetology,
    careCosmetology,
    isPricesPage,
  } = props

  return (
    <Layout isShortVariant={isPricesPage} isServicesPage>
      <S title="Послуги" />
      <ServicesHero {...{ heading, text }} />

      <Container as="section" className={s.services}>
        <Category {...injectionsCosmetology[0]} isPricesPage={isPricesPage} />
        <Category {...careCosmetology[0]} isPricesPage={isPricesPage} />
      </Container>
    </Layout>
  )
}

export default Services
