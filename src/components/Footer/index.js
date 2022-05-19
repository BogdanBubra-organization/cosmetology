import React from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Social from '~components/Social'

import * as s from './style.module.scss'

const Footer = ({ siteTitle }) => {
  const currentYear = new Date().getFullYear()

  return (
    <Container as="footer" className={s.footer}>
      <div className={s.footer_inner}>
        <Social />
        <div className={s.footer_copy}>
          © {siteTitle} {currentYear}.
        </div>
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
