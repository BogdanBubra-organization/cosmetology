import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

const NotFoundPage = () => {
  useEffect(() => {
    navigate('/')
  }, [])

  return <div />
}

export default NotFoundPage

export const Head = () => <html lang="uk" />
