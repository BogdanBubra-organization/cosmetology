import React from 'react'
import { Container } from 'react-bootstrap'
import cn from 'classnames'
import Icon from '~components/Icon'
import Social from '~components/Social'
import Menu from '~components/Menu'
import logo from './img/logo-min.svg'
import * as s from './style.module.scss'

const Author = () => (
  <div className={s.footer_author}>
    Дизайн та розробка{' '}
    <a href="https://min.studio" target="_blank" rel="noreferrer">
      min.studio
    </a>
  </div>
)

const Footer = ({ isMessengersPage }) => {
  const currentYear = new Date().getFullYear()

  return !isMessengersPage ? (
    <footer className={s.footer}>
      <div className={s.footer_inner}>
        <div className={s.footer_info}>
          <img src={logo} width="31" height="41" alt="Logo" />
          <a
            className={s.footer_address}
            href="/maps"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="mark" size={20} />
            м.Чернігів, вул. Гоголя, 3
          </a>
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
