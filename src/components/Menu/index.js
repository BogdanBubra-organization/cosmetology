/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from '@gatsbyjs/reach-router'
import gsap from 'gsap'
import { Nav } from 'react-bootstrap'
import { Link, withPrefix } from 'gatsby'
import cn from 'classnames'
import ServicesItem from './ServicesItem'

const Menu = ({ data, categories, variant, className }) => {
  const location = useLocation()
  const isHomepage = location.pathname === withPrefix('/')

  const handleScroll = (e, to) => {
    e.preventDefault()
    gsap.to(window, {
      scrollTo: to,
      ease: 'power2',
    })
  }

  return (
    <Nav className={cn({ [`nav--${variant}`]: variant }, className)} as="ul">
      {data?.map(({ title, to, isExternal }) => {
        const isInternal = to.includes('#')

        const linkProps = isExternal
          ? { href: to, target: '_blank', rel: 'noopener noreferrer' }
          : isInternal
          ? {
              href: isHomepage ? `${to}` : null,
              to: isHomepage ? null : `/${to}`,
              as: isHomepage ? 'a' : Link,
              onClick: isHomepage ? (e) => handleScroll(e, to) : null,
            }
          : { to, as: Link, activeClassName: 'active' }

        return (
          <Nav.Item as="li" key={title}>
            {to === '/services' && variant !== 'footer' ? (
              <ServicesItem categories={categories} title={title} />
            ) : (
              <Nav.Link {...linkProps}>{title}</Nav.Link>
            )}
          </Nav.Item>
        )
      })}
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
