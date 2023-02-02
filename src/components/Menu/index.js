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
      {data?.map(({ title, to }) => (
        <Nav.Item as="li" key={title}>
          {to === '/services' && variant !== 'footer' ? (
            <ServicesItem categories={categories} title={title} />
          ) : (
            <Nav.Link as={Link} to={to} activeClassName="active">
              {title}
            </Nav.Link>
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
