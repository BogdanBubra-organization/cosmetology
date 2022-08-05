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

const Product = ({ data: { product, sameServices } }) => {
  const { name } = product

  return (
    <Layout>
      <Container>
        <S title={name} />
        <h1 className={cn('h2', productTitle)}>{name}</h1>
        <ProductHero {...product} />
        <SameProducts list={sameServices.edges} />
      </Container>
      <Lights />
    </Layout>
  )
}

export default Product

export const pageQuery = graphql`
  query servicesQuery($slug: String!, $id: String!, $category: String!) {
    product: servicesJson(slug: { eq: $slug }) {
      name
      info {
        descr {
          type
          data
        }
        workPic {
          childImageSharp {
            gatsbyImageData(quality: 100, width: 680, placeholder: NONE)
            blurHash {
              base64Image
            }
          }
        }
      }
    }
    sameServices: allServicesJson(
      limit: 4
      filter: { category: { eq: $category }, id: { ne: $id } }
    ) {
      edges {
        node {
          id
          slug
          name
          duration
          preview {
            publicURL
          }
        }
      }
    }
  }
`
