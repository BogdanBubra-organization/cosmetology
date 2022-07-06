import React from 'react'
import { Container } from 'react-bootstrap'
import cn from 'classnames'
import Layout from '~components/Layout'
import S from '~components/seo'
import Social from '~components/Social'
import Pics from './components/Pics'
import DATA from './constants'
import * as s from './Messengers.module.scss'

const Messengers = () => {
  return (
    <Layout isMessengersPage>
      <S {...DATA} />
      <Container as="section" className={s.messengers}>
        <div className={cn(s.messengers_inner, 'animate')}>
          <p className={s.messengers_descr}>{DATA.description}</p>
          <Social isMessengers />
        </div>
      </Container>
      <Pics />
    </Layout>
  )
}

export default Messengers
