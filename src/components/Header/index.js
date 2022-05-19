import React from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

import logo from '~img/logo.svg'

import * as s from './style.module.scss'

const Header = ({ siteTitle }) => (
  <Container as="header" className={s.header}>
    <div>
      <img width="156" height="88" src={logo} alt={siteTitle} />
    </div>
  </Container>
)

Header.defaultProps = {
  siteTitle: '',
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
