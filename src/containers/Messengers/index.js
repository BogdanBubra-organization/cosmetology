import React from 'react'
import { Container } from 'react-bootstrap'
import cn from 'classnames'

import Layout from '~components/Layout'
import S from '~components/seo'
import Social from '~components/Social'
import Pics from './components/Pics'
import * as s from './Messengers.module.scss'

const Messengers = ({ text, socials, leftImage, rightImage }) => (
  <Layout isMessengersPage>
    <S title="Звʼязок" description={text} />
    <Container as="section" className={s.messengers}>
      <div className={cn(s.messengers_inner, 'animate')}>
        <p className={s.messengers_descr}>{text}</p>
        <Social
          data={socials}
          variant="messengers"
          isWithIcon
          iconSize={20}
          isBtn
          isWithText
        />
      </div>
    </Container>
    <Pics leftImage={leftImage} rightImage={rightImage} />
  </Layout>
)

export default Messengers
