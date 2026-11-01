/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container } from 'react-bootstrap'
import { StructuredText } from 'react-datocms'
import Layout from '~components/Layout'
import Lights from '~components/Lights'

import * as s from './PublicOffer.module.scss'

const PublicOffer = ({ title, content }) => {
  return (
    <Layout>
      <Container as="section" className={s.publicOffer}>
        <h1 className={s.publicOffer_title}>{title}</h1>

        <div className={s.publicOffer_content}>
          <StructuredText data={content?.value} />
        </div>
      </Container>
      <Lights />
    </Layout>
  )
}

export default PublicOffer
