import React, { useEffect } from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'

import useMatchMedia from '~hooks/useMatchMedia'
import { appearAnim, resetAnim } from '~utils/appearAnim'
import usePosts from '~hooks/usePosts'
import Lights from '~components/Lights'
import Hero from './components/Hero'
import Services from './components/Services'
import Reviews from './components/Reviews'
import About from './components/About'
import Gallery from './components/Gallery'

const Home = () => {
  const isPreloaded =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('isPreloaded')
      : false

  const { posts, isLoading } = usePosts(5)
  const isDesktop = useMatchMedia('(min-width: 1200px)')

  useEffect(() => {
    if (!isPreloaded && isDesktop && posts.length) {
      const sections = document.querySelectorAll('section')
      const header = document.querySelector('header')

      ;[header, ...sections].forEach(({ id }) => {
        appearAnim({ id })
      })
    }

    return () => resetAnim()
  }, [isPreloaded, isDesktop, posts])
  return (
    <Layout>
      <S />
      <Lights />
      <Hero isPreloaded={isPreloaded} isDesktop={isDesktop} />
      <Services />
      <Gallery posts={posts} isLoading={isLoading} />
      <About />
      <Reviews />
    </Layout>
  )
}

export default Home
