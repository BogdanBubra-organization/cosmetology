import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation } from '@gatsbyjs/reach-router'
import Icon from '~components/Icon'
import Social from '~components/Social'
import cn from 'classnames'
import * as s from './style.module.scss'

const Footer = () => {
  const location = useLocation()
  const isMessengersPage = location.pathname === '/messengers'

  return (
    <Container as="footer" className={cn(s.footer, 'animate')}>
      <div className={cn(s.footer_inner, { [s.center]: isMessengersPage })}>
        {!isMessengersPage && (
          <>
            <Social variant="footer" />
            <a
              className={s.footer_address}
              href="/maps"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="mark" size={20} />
              м.Чернігів, вул. Гоголя, 3
            </a>
          </>
        )}
        <div className={s.footer_author}>
          Дизайн та розробка{' '}
          <a href="https://min.studio" target="_blank" rel="noreferrer">
            min.studio
          </a>
        </div>
      </div>
    </Container>
  )
}

export default Footer
