import React from 'react'
import { graphql } from 'gatsby'

import PublicOffer from '~containers/PublicOffer'

const PublicOfferPage = ({ data }) => (
  <PublicOffer {...data.datoCmsPublicOfferPage} />
)

export const query = graphql`
  query PublicOfferPageQuery {
    datoCmsPublicOfferPage {
      title
      content {
        value
      }
    }
  }
`

export default PublicOfferPage
