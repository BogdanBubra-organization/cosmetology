import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import Home from '~containers/Home'

const queryClient = new QueryClient()

const HomePage = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
)

export default HomePage
