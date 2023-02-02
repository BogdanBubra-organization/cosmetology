import React from 'react'
import { Container } from 'react-bootstrap'

import Layout from '~components/Layout'
import S from '~components/seo'
import Category from '~components/Category'
import ServicesHero from './components/ServicesHero'
import * as s from './Services.module.scss'

const Services = (props) => {
  const { heading, text, categories, isPricesPage } = props

  return (
    <Layout isShortVariant={isPricesPage} isServicesPage>
      <S title="Послуги" />
      <ServicesHero {...{ heading, text }} />

      <Container as="section" className={s.services}>
        {categories.map((item) => (
          <Category
            isServices
            key={item.title}
            {...item}
            isPricesPage={isPricesPage}
          />
        ))}
      </Container>
    </Layout>
  )
}

export default Services
