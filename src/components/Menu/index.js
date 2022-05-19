import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from '@gatsbyjs/reach-router'
import { Link, withPrefix } from 'gatsby'
import { Nav } from 'react-bootstrap'
import cn from 'classnames'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

import MENU from './constants'

const Menu = ({ variant }) => {
  const location = useLocation()
  const isHomepage = location.pathname === withPrefix('/')

  gsap.registerPlugin(ScrollToPlugin)

  const handleScroll = (e, link) => {
    e.preventDefault()
    gsap.to(window, { scrollTo: link, ease: 'power2' })
  }

  return (
    <Nav className={cn({ [`nav--${variant}`]: variant })} as="ul">
      {MENU.map(({ name, link }) => (
        <Nav.Item as="li" key={name}>
          {isHomepage ? (
            <Nav.Link href={`${link}`} onClick={(e) => handleScroll(e, link)}>
              {name}
            </Nav.Link>
          ) : (
            <Link to={`/${link}`} className="nav-link" activeClassName="active">
              {name}
            </Link>
          )}
        </Nav.Item>
      ))}
    </Nav>
  )
}

Menu.defaultProps = {
  variant: '',
}

Menu.propTypes = {
  variant: PropTypes.string,
}

export default Menu
