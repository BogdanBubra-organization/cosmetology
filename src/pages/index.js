import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Container } from 'react-bootstrap'

import Icon from '~components/Icon'
import Layout from '../components/Layout'
import S from '../components/seo'

const IndexPage = ({ data: { image } }) => (
  <Layout>
    <Container>
      <S title="Home" />
      <h1>Howdy!</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <p>
        {/* Example of GatsbyImage with blurhash placeholder */}
        <GatsbyImage
          image={{
            ...image.gatsbyImageData,
            placeholder: {
              fallback: image.blurHash.base64Image,
            },
          }}
          alt="Gatsby Logo"
        />
      </p>
      <p>
        {/* Example of sprite icon usage  */}
        <Icon name="globe" size={60} />
        <Icon name="icon-logo" size={60} isFromInlineDefs />
      </p>
      <p>
        <Link to="/page-2">Go to page 2</Link> <br />
      </p>
    </Container>
  </Layout>
)

// Page GraphQL query example
export const query = graphql`
  {
    image: imageSharp {
      gatsbyImageData(quality: 100, placeholder: NONE)
      blurHash(width: 100) {
        base64Image
      }
    }
  }
`

export default IndexPage
