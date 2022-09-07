/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { SSRProvider } from 'react-bootstrap'

import Header from '~components/Header'
import Footer from '~components/Footer'
import Preload from '~components/Preload'
import '~styles/app.scss'
import * as s from './style.module.scss'

const Layout = ({ isMessengersPage, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      datoCmsLayout {
        header {
          logo {
            url
            alt
          }
          menu {
            title
            to
          }
        }
        footer {
          address {
            title
            href
          }
          logo {
            url
            alt
          }
          menu {
            title
            to
          }
          copyright {
            value
          }
          socials {
            name
            href
            isExternal
          }
        }
      }
    }
  `)

  const layoutRef = useRef(null)
  const [isPreloaded, setIsPreloaded] = useState(
    typeof window !== 'undefined'
      ? sessionStorage.getItem('isPreloaded')
      : false
  )

  const handlePreload = () => {
    sessionStorage.setItem('isPreloaded', true)
    setIsPreloaded(true)
  }

  useEffect(() => {
    if (isPreloaded) {
      layoutRef.current.style.visibility = 'visible'
      layoutRef.current.style.opacity = 1
    }
  }, [isPreloaded])

  return (
    <SSRProvider>
      <div className={s.layout} ref={layoutRef}>
        <Header {...data.datoCmsLayout.header?.[0]} />
        <main className="main">{children}</main>
        <Footer
          {...data.datoCmsLayout.footer?.[0]}
          isMessengersPage={isMessengersPage}
        />
      </div>

      {!isPreloaded && <Preload handlePreload={handlePreload} />}
    </SSRProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
