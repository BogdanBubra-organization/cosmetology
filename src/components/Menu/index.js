/* eslint-disable no-shadow */
import React from 'react'
import PropTypes from 'prop-types'
import { Nav } from 'react-bootstrap'
import { Link } from 'gatsby'
import cn from 'classnames'
import ServicesItem from './ServicesItem'

const Menu = ({ data, categories, variant, className }) => {
  return (
    <Nav className={cn({ [`nav--${variant}`]: variant }, className)} as="ul">
      {data?.map(({ title, to, isExternal }) => {
        const linkProps = isExternal
          ? { href: to, target: '_blank', rel: 'noopener noreferrer' }
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
