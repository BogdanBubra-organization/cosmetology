import React from 'react'
import { Container } from 'react-bootstrap'
import cn from 'classnames'
import Social from '~components/Social'
import Menu from '~components/Menu'
import AddresPin from '~components/AddressPin'
import { useLocation } from '@gatsbyjs/reach-router'
import { Link, withPrefix } from 'gatsby'
import logo from './img/logo-min.svg'
import * as s from './style.module.scss'

const Author = () => (
  <div className={s.footer_author}>
    Дизайн та розробка{' '}
    <a href="https://min.studio" target="_blank" rel="noreferrer">
      Мінімал
    </a>
  </div>
)

const Logo = ({ alt }) => <img src={logo} width="31" height="41" alt={alt} />

const Footer = ({ isMessengersPage }) => {
  const location = useLocation()
  const isHomepage = location.pathname === withPrefix('/')

  const currentYear = new Date().getFullYear()

  return !isMessengersPage ? (
    <footer className={s.footer}>
      <div className={s.footer_inner}>
        <div className={s.footer_info}>
          {isHomepage ? (
            <Logo alt="Cosmetology.ua" />
          ) : (
            <Link to="/">
              <Logo alt="Cosmetology.ua" />
            </Link>
          )}
          <AddresPin />
        </div>
        <Menu variant="footer" />
        <Social variant="footer" isWithIcon />
        <div className={s.footer_copy}>
          <span>Всі права захищено</span>{' '}
          <span>© Клініка косметології {currentYear}</span>
        </div>
        <Author />
      </div>
    </footer>
  ) : (
    <Container as="footer" className={cn(s.footer, s.messengers, 'animate')}>
      <Author />
    </Container>
  )
}

export default Footer
