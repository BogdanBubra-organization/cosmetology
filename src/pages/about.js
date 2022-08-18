import React from 'react'
import { graphql } from 'gatsby'

import About from '~containers/About'

const AboutPage = ({ data }) => <About {...data.datoCmsAboutPage} />

export const query = graphql`
  query AboutPageQuery {
    datoCmsAboutPage {
      hero {
        heading {
          value
        }
        title {
          value
        }
        descr
        image {
          gatsbyImageData(
            width: 484
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
        socials {
          name
          href
          isExternal
        }
      }
      quote
      cosmetician {
        title {
          value
        }
        subtitle {
          value
        }
        descr {
          value
        }
        avatar {
          gatsbyImageData(
            width: 332
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
      }
      brands {
        name
        logo {
          gatsbyImageData(
            height: 48
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
      }
    }
  }
`

export default AboutPage
