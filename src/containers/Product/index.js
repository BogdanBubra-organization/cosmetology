import React from 'react'
import { Container } from 'react-bootstrap'
import { graphql } from 'gatsby'
import Layout from '~components/Layout'
import S from '~components/seo'

const Product = ({ data: { product } }) => {
  const { name } = product

  return (
    <Layout>
      <Container>
        <S title={name} />
        <h1>{name}</h1>
      </Container>
    </Layout>
  )
}

export default Product

export const pageQuery = graphql`
  query servicesQuery($slug: String!) {
    product: servicesJson(slug: { eq: $slug }) {
      name
    }
  }
`
