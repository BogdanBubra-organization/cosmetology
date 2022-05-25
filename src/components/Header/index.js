import React from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

import logo from '~img/logo.svg'
import cn from 'classnames'
import * as s from './style.module.scss'

const Header = ({ siteTitle }) => (
  <Container as="header" className={cn(s.header, 'animate')}>
    <img width="156" height="88" src={logo} alt={siteTitle} />
  </Container>
)

Header.defaultProps = {
  siteTitle: '',
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
