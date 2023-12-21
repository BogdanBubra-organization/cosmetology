/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container } from 'react-bootstrap'

import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import PriceSection from './components/PriceSection'

import * as s from './Price.module.scss'

const Price = ({ title, content }) => {
  return (
    <Layout>
      <S title="Прайс" />
      <Container as="section" className={s.price}>
        <h1 className={s.price_title}>{title}</h1>

        <section className={s.price_list}>
          {content.map((item, i) => (
            <PriceSection key={item.title + i} {...item} />
          ))}
        </section>
      </Container>
      <Lights />
    </Layout>
  )
}

export default Price
