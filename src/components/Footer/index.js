import React from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'

import Menu from '~components/Menu'

import * as s from './style.module.scss'

const Footer = ({ siteTitle }) => {
  const currentYear = new Date().getFullYear()

  return (
    <Container as="footer" className={s.footer}>
      <div className={s.footer__logo}>{siteTitle}</div>
      <Menu variant="footer" />
      <div className={s.footer__copy}>
        © {currentYear} {siteTitle}. All Rights Reserved
      </div>
    </Container>
  )
}

Footer.defaultProps = {
  siteTitle: '',
}

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

export default Footer
