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
        link
      }
      gallery {
        heading
        tabs {
          text
          key
        }
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
        link
      }
      about: aboutClinic {
        heading
        descr {
          value
        }
        link
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
        link
      }
    }
  }
`

export default HomePage
