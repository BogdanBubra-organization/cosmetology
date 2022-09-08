import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { graphql } from 'gatsby'

import Home from '~containers/Home'
import Placeholder from '~containers/Placeholder'

const queryClient = new QueryClient()

const HomePage = ({ data }) => (
  <QueryClientProvider client={queryClient}>
    {data.datoCmsPlaceholder.isInDevelopment ? (
      <Placeholder {...data.datoCmsHomepage} />
    ) : (
      <Home {...data.datoCmsHomepage} />
    )}
  </QueryClientProvider>
)

export const query = graphql`
  query HomePageQuery {
    datoCmsPlaceholder {
      isInDevelopment
    }
    datoCmsHomepage {
      hero {
        heading
        text
        image {
          gatsbyImageData(
            placeholder: NONE
            forceBlurhash: true
            width: 596
            imgixParams: { fit: "crop", auto: "compress,format" }
            sizes: "(max-width: 767.98px) 347px, (max-width: 1023.98px) 411px, (max-width: 1199.98px) 366px, (max-width: 1399.98px) calc((100vw - 32px * 2) * 0.40), 596px"
            breakpoints: [347, 411, 596, 694, 822, 894, 1041, 1192]
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
