import React from 'react'
import { graphql } from 'gatsby'

import Price from '~containers/Price'

const PricePage = ({ data }) => <Price {...data.datoCmsPricePage} />

export const query = graphql`
  query PricePageQuery {
    datoCmsPricePage {
      title
      content {
        title
        items {
          title
          description
          price
          priceDescription
          link {
            slug
          }
        }
        note
      }
    }
  }
`

export default PricePage
