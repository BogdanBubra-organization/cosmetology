import React from 'react'

import S from '~components/seo'
import Lights from '~components/Lights'

import PlaceholderHeader from './components/PlaceholderHeader'
import PlaceholderFooter from './components/PlaceholderFooter'
import PlaceholderPics from './components/PlaceholderPics'
import PlaceholderComingSoon from './components/PlaceholderComingSoon'

import * as s from './Placeholder.module.scss'

const IndexPage = () => (
  <div className={s.layout}>
    <PlaceholderHeader />
    <main>
      <S />
      <PlaceholderComingSoon />
      <PlaceholderPics />
    </main>
    <PlaceholderFooter />
    <Lights />
    {/* {!isPreloaded && <Preload />} */}
  </div>
)

export default IndexPage
