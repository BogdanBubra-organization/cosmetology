/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from '../Header'
import Footer from '../Footer'
import SVGDefs from './SVGDefs'

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

  return (
    <div className={layout}>
      <Header siteTitle={data.site.siteMetadata?.title} />
      <main className="main">{children}</main>
      <Footer siteTitle={data.site.siteMetadata?.title} />
      <SVGDefs />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
