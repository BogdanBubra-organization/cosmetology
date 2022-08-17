import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { graphql } from 'gatsby'

import Gallery from '~containers/Gallery'

const queryClient = new QueryClient()

const GalleryPage = ({ data, location }) => (
  <QueryClientProvider client={queryClient}>
    <Gallery {...data.datoCmsGallery} location={location} />
  </QueryClientProvider>
)

export const query = graphql`
  query GalleryPageQuery {
    datoCmsGallery {
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
    }
  }
`

export default GalleryPage
