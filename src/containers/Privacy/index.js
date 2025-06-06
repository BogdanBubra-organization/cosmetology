/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container } from 'react-bootstrap'
import { StructuredText } from 'react-datocms'
import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'

import * as s from './Privacy.module.scss'

const Privacy = ({ title, content }) => {
  return (
    <Layout>
      <S title="Політика конфіденційності" />
      <Container as="section" className={s.privacy}>
        <h1 className={s.privacy_title}>{title}</h1>

        <div className={s.privacy_content}>
          <StructuredText data={content?.value} />
        </div>
      </Container>
      <Lights />
    </Layout>
  )
}

export default Privacy
