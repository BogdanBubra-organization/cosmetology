import React, { createElement } from 'react'
import { Container } from 'react-bootstrap'
import { StructuredText } from 'react-datocms'
import { Link, withPrefix } from 'gatsby'
import { useLocation } from '@gatsbyjs/reach-router'
import cn from 'classnames'

import Social from '~components/Social'
import Menu from '~components/Menu'
import AddressPin from '~components/AddressPin'
import WorkingHours from '~components/WorkingHours'

import * as s from './Footer.module.scss'

const Author = (props) => (
  <div {...props}>
    Дизайн та розробка{' '}
    <a href="https://min.studio" target="_blank" rel="noreferrer">
      min.studio
    </a>
  </div>
)

const Logo = ({ url, alt }) => (
  <img src={url} width="48" height="64" alt={alt} className={s.footerLogo} />
)

const LogoFull = ({ url, alt }) => (
  <img
    src={url}
    width="188"
    height="40"
    alt={alt}
    className={s.footerLogoFull}
  />
)

const Footer = ({
  address,
  workingHours,
  logo,
  logoFull,
  menu,
  copyright,
  socials,
  isMessengersPage,
}) => {
  const location = useLocation()
  const isHomepage = location.pathname === withPrefix('/')

  const currentYear = new Date().getFullYear()

  return !isMessengersPage ? (
    <footer id="footer" className={s.footer}>
      <div className={s.footerInner}>
        <div className={s.footerLogoWrapper}>
          {createElement(
            isHomepage ? React.Fragment : Link,
            isHomepage ? {} : { to: '/', className: s.logoLink },
            <>
              <Logo {...logo} />
              <LogoFull {...logoFull} />
            </>
          )}
        </div>
        <div className={s.footerInfo}>
          <AddressPin {...address} />
          <WorkingHours {...workingHours} />
        </div>
        <Menu data={menu} variant="footer" className={s.footerMenu} />
        <Social
          data={socials}
          variant="footer"
          isWithIcon
          className={s.footerSocial}
        />
        <div className={s.footerCopy}>
          <StructuredText data={copyright?.value} />
          {currentYear}
        </div>
        <Author className={s.footerAuthor} />
      </div>
    </footer>
  ) : (
    <Container as="footer" className={cn(s.footer, s.messengers, 'animate')}>
      <Author />
    </Container>
  )
}

export default Footer
