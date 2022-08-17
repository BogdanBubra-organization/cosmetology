import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { graphql } from 'gatsby'

import Home from '~containers/Home'

const queryClient = new QueryClient()

const HomePage = ({ data }) => (
  <QueryClientProvider client={queryClient}>
    <Home {...data.datoCmsHomepage} />
  </QueryClientProvider>
)

export const query = graphql`
  query HomePageQuery {
    datoCmsHomepage {
      hero {
        heading
        text
        image {
          gatsbyImageData(
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
        brandsTitle
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
  }
`

export default HomePage
