/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Header from '~components/Header'
import Footer from '~components/Footer'
import Lights from '~components/Lights'
import Preload from '~components/Preload'
import '~styles/app.scss'
import * as s from './style.module.scss'

const Layout = ({ children, isMessengersPage }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [isPreloaded, setIsPreloaded] = useState(
    typeof window !== 'undefined'
      ? sessionStorage.getItem('isPreloaded')
      : false
  )

  const handlePreload = () => {
    sessionStorage.setItem('isPreloaded', true)
    setIsPreloaded(true)
  }

  return (
    <>
      <div className={s.layout}>
        <Header siteTitle={data.site.siteMetadata?.title} />
        <main className="main">{children}</main>
        <Footer
          isMessengersPage={isMessengersPage}
          siteTitle={data.site.siteMetadata?.title}
        />
        <Lights />
      </div>
      {!isPreloaded && <Preload handlePreload={handlePreload} />}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
