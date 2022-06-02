import React from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useLocation } from '@gatsbyjs/reach-router'
import Social from '~components/Social'
import cn from 'classnames'
import * as s from './style.module.scss'

const Footer = ({ siteTitle }) => {
  const currentYear = new Date().getFullYear()

  const location = useLocation()
  const isMessengersPage = location.pathname === '/messengers'

  return (
    <Container as="footer" className={cn(s.footer, 'animate')}>
      <div className={cn(s.footer_inner, { [s.center]: isMessengersPage })}>
        {!isMessengersPage && <Social />}
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
