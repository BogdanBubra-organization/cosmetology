import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useLocation } from '@gatsbyjs/reach-router'
import { withPrefix, Link } from 'gatsby'
import PropTypes from 'prop-types'
import cn from 'classnames'
import logo from '~img/logo.svg'
import Menu from '~components/Menu'
import * as s from './style.module.scss'

const Logo = ({ alt }) => <img width="244" height="52" src={logo} alt={alt} />

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
      <Menu variant="header" />
      <div className={s.header_btn}>
        <Button variant="secondary">Маєте питання?</Button>
      </div>
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
