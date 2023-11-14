import React from 'react'
import { Container } from 'react-bootstrap'
import { graphql } from 'gatsby'
import cn from 'classnames'
import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import ProductHero from './components/ProductHero'

import * as s from './Product.module.scss'
import SameProducts from './components/SameProducts'

const Product = (props) => {
  const {
    pageContext: { isPricingPage },
    data: { product, sameServices, sameServicesUncategorized, systemInfo },
  } = props
  const { name } = product

  return (
    <Layout isShortVariant={isPricingPage}>
      <Container className={cn({ [s.shortContainer]: isPricingPage })}>
        <S title={name} />
        <h1 className={cn('h2', s.productTitle)}>{name}</h1>
        <ProductHero {...product} {...systemInfo} />
        {!isPricingPage && (
          <SameProducts
            list={
              sameServices.nodes.length
                ? sameServices.nodes
                : sameServicesUncategorized.nodes
            }
            title={systemInfo?.otherProceduresTitle}
          />
        )}
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
      price
      priceFrom
      priceTo
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
      instagramLink
      warningSection {
        title
        warningList {
          name
        }
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
    sameServicesUncategorized: allDatoCmsService(
      limit: 4
      filter: { id: { ne: $id } }
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
