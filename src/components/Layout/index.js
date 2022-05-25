/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from '~components/Header'
import Footer from '~components/Footer'
import Lights from '~components/Lights'
import Preload from '~components/Preload'
import appearAnim from './anim'
import '~styles/app.scss'
import { layout } from './style.module.scss'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(() => {
    appearAnim()
  }, [])

  return (
    <div className={layout}>
      <Header siteTitle={data.site.siteMetadata?.title} />
      <main className="main">{children}</main>
      <Footer siteTitle={data.site.siteMetadata?.title} />
      <Lights />
      <Preload />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
