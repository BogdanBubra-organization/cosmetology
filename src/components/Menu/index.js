import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Nav } from 'react-bootstrap'
import cn from 'classnames'

const Menu = ({ data, variant }) => {
  return (
    <Nav className={cn({ [`nav--${variant}`]: variant })} as="ul">
      {data?.map(({ title, to }) => (
        <Nav.Item as="li" key={title}>
          <Nav.Link as={Link} to={to} activeClassName="active">
            {title}
          </Nav.Link>
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
