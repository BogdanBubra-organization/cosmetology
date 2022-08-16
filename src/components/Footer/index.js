import React from 'react'
import { Container } from 'react-bootstrap'
import { StructuredText } from 'react-datocms'
import { Link, withPrefix } from 'gatsby'
import { useLocation } from '@gatsbyjs/reach-router'
import cn from 'classnames'

import Social from '~components/Social'
import Menu from '~components/Menu'
import AddresPin from '~components/AddressPin'
import * as s from './style.module.scss'

const Author = ({ data }) => (
  <div className={s.footer_author}>
    <StructuredText data={data?.value} />
  </div>
)

const Logo = ({ url, alt }) => (
  <img src={url} width="31" height="41" alt={alt} />
)

const Footer = ({
  address,
  logo,
  menu,
  copyright,
  socials,
  developedBy,
  isMessengersPage,
}) => {
  const location = useLocation()
  const isHomepage = location.pathname === withPrefix('/')

  const currentYear = new Date().getFullYear()

  return !isMessengersPage ? (
    <footer className={s.footer}>
      <div className={s.footer_inner}>
        <div className={s.footer_info}>
          {isHomepage ? (
            <Logo {...logo} />
          ) : (
            <Link to="/">
              <Logo {...logo} />
            </Link>
          )}
          {address && <AddresPin {...address} />}
        </div>
        <Menu data={menu} variant="footer" />
        <Social data={socials} variant="footer" isWithIcon />
        <div className={s.footer_copy}>
          <StructuredText data={copyright?.value} />
          {currentYear}
        </div>
        <Author data={developedBy} />
      </div>
    </footer>
  ) : (
    <Container as="footer" className={cn(s.footer, s.messengers, 'animate')}>
      <Author data={developedBy} />
    </Container>
  )
}

export default Footer
