import React from 'react'
import { Container } from 'react-bootstrap'
import { graphql } from 'gatsby'
import cn from 'classnames'
import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import ProductHero from './components/ProductHero'

import { productTitle } from './Product.module.scss'
import SameProducts from './components/SameProducts'

const Product = ({ data: { product, sameServices, systemInfo } }) => {
  const { name } = product

  return (
    <Layout>
      <Container>
        <S title={name} />
        <h1 className={cn('h2', productTitle)}>{name}</h1>
        <ProductHero {...product} {...systemInfo} />
        <SameProducts
          list={sameServices.nodes}
          title={systemInfo?.otherProceduresTitle}
        />
      </Container>
      <Lights />
    </Layout>
  )
}

export default Product

export const pageQuery = graphql`
  query servicesQuery($slug: String!, $id: String!, $category: String!) {
    product: datoCmsService(slug: { eq: $slug }) {
      name
      descr {
        value
      }
      previewImage {
        url
      }
      example {
        url
        video {
          thumbnailUrl
        }
        gatsbyImageData(
          placeholder: NONE
          forceBlurhash: true
          imgixParams: { fit: "crop", auto: "compress,format" }
        )
      }
    }
    sameServices: allDatoCmsService(
      limit: 4
      filter: { category: { eq: $category }, id: { ne: $id } }
    ) {
      nodes {
        slug
        name
        duration
        previewImage {
          url
        }
      }
    }
    systemInfo: datoCmsServiceSystemInfo {
      imageTitle
      descrTitle
      otherProceduresTitle
    }
  }
`
