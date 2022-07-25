import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import Gallery from '~containers/Gallery'

const queryClient = new QueryClient()

const GalleryPage = ({ location }) => (
  <QueryClientProvider client={queryClient}>
    <Gallery location={location} />
  </QueryClientProvider>
)

export default GalleryPage
