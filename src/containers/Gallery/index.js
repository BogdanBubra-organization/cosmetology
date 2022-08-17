import React from 'react'
import { Container } from 'react-bootstrap'

import Layout from '~components/Layout'
import S from '~components/seo'
import GalleryList from './Components/GalleryList'

import { galleryWrapper } from './Gallery.module.scss'

const Gallery = ({ heading, media, instagramTab, resultsTab, location }) => {
  const { state } = location

  const tabs = [instagramTab, resultsTab]

  return (
    <Layout>
      <S title="Галерея" />
      <Container className={galleryWrapper}>
        <h1>{heading}</h1>
        <GalleryList tabs={tabs} media={media} initialTab={state?.tab} />
      </Container>
    </Layout>
  )
}

export default Gallery
