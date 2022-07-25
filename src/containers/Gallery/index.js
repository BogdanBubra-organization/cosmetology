import React from 'react'
import { Container } from 'react-bootstrap'

import Layout from '~components/Layout'
import S from '~components/seo'
import GalleryList from './Components/GalleryList'

import { galleryWrapper } from './Gallery.module.scss'

const Gallery = ({ location }) => {
  const { state } = location

  return (
    <Layout>
      <S title="Галерея" />
      <Container className={galleryWrapper}>
        <h1>Фотогалерея</h1>
        <GalleryList initialTab={state?.tab} />
      </Container>
    </Layout>
  )
}

export default Gallery
