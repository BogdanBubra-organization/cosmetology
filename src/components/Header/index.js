import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from '@gatsbyjs/reach-router'
import { withPrefix, Link } from 'gatsby'
import PropTypes from 'prop-types'

import logo from '~img/logo.svg'
import cn from 'classnames'
import * as s from './style.module.scss'

const Logo = ({ alt }) => <img width="156" height="88" src={logo} alt={alt} />

const Header = ({ siteTitle }) => {
  const location = useLocation()
  const isHomepage = location.pathname === withPrefix('/')

  return (
    <Container as="header" className={cn(s.header, 'animate')}>
      {isHomepage ? (
        <Logo alt={siteTitle} />
      ) : (
        <Link to="/">
          <Logo alt={siteTitle} />
        </Link>
      )}
    </Container>
  )
}

Header.defaultProps = {
  siteTitle: '',
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
