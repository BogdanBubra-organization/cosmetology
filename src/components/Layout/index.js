/* eslint-disable import/no-extraneous-dependencies */
/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { useLocation } from '@gatsbyjs/reach-router'
import { SSRProvider } from 'react-bootstrap'
import Header from '~components/Header'
import Footer from '~components/Footer'
import Preload from '~components/Preload'
import NavBtns from '~components/NavBtns'
import '~styles/app.scss'
import * as s from './style.module.scss'

const Layout = ({
  isMessengersPage,
  isServicesPage,
  children,
  isShortVariant,
}) => {
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
            isExternal
          }
        }
        footer {
          address {
            title
            href
          }
          workingHours {
            weekdaysShort
            time
          }
          logo {
            url
            alt
          }
          logoFull {
            url
            alt
          }
          menu {
            title
            to
            isExternal
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
      allDatoCmsCategory {
        nodes {
          slug
          title
          descr
          image {
            url
          }
        }
      }
    }
  `)

  const location = useLocation()

  useEffect(() => {
    if (location.search.includes('utm')) {
      sessionStorage.setItem('utmData', location.pathname + location.search)
    }
  }, [])

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
      document.body.style.overflow = 'auto'
    }
  }, [isPreloaded])

  return (
    <SSRProvider>
      <div className={s.layout} ref={layoutRef}>
        <Header
          {...data.datoCmsLayout.header?.[0]}
          categories={data.allDatoCmsCategory.nodes}
          isNavHidden={isShortVariant}
        />

        <main className="main">
          {children}
          {!isShortVariant && <NavBtns isServicesPage={isServicesPage} />}
        </main>

        {!isShortVariant && (
          <Footer
            {...data.datoCmsLayout.footer?.[0]}
            isMessengersPage={isMessengersPage}
          />
        )}
      </div>

      {!isPreloaded && <Preload handlePreload={handlePreload} />}
    </SSRProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
