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
        btnOrder
        btnService
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
      services {
        heading
        text
        services {
          slug
          name
          duration
          previewImage {
            url
          }
        }
        linkText
      }
      gallery {
        heading
        instagramTab
        resultsTab
        media {
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
        linkText
      }
      about: aboutClinic {
        heading
        descr {
          value
        }
        linkText
        image {
          gatsbyImageData(
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
      }
      reviews {
        heading
        reviews {
          id
          name
          rating
          avatar {
            gatsbyImageData(
              height: 62
              width: 62
              placeholder: NONE
              forceBlurhash: true
              imgixParams: { fit: "crop", auto: "compress,format" }
            )
          }
          text
          date
        }
        linkText
      }
    }
  }
`

export default HomePage
