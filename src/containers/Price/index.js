/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container } from 'react-bootstrap'
import { StructuredText } from 'react-datocms'
import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import PriceSection from './components/PriceSection'

import * as s from './Price.module.scss'

const Price = ({ title, description, content }) => {
  const isDescriptionAvailable = description?.value?.document?.children.some(
    (child) => child.children.some((subChild) => subChild.value.trim())
  )
  return (
    <Layout>
      <S title="Прайс" />
      <Container as="section" className={s.price}>
        <h1 className={s.price_title}>{title}</h1>

        {isDescriptionAvailable && (
          <div className={s.price_descr}>
            <StructuredText data={description?.value} />
          </div>
        )}

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
