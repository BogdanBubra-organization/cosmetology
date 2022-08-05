import React, { useState } from 'react'
import { Button, Container, Dropdown } from 'react-bootstrap'
import { useLocation } from '@gatsbyjs/reach-router'
import { withPrefix, Link } from 'gatsby'
import useMatchMedia from '~hooks/useMatchMedia'
import PropTypes from 'prop-types'
import ModalOrder from '~components/ModalOrder'
import logo from '~img/logo.svg'
import Menu from '~components/Menu'
import * as s from './style.module.scss'

const Logo = ({ alt }) => <img width="244" height="52" src={logo} alt={alt} />

const ButtonAsk = ({ handleShowOrder }) => (
  <Button onClick={handleShowOrder} variant="secondary">
    Маєте питання?
  </Button>
)

const Header = ({ siteTitle }) => {
  const location = useLocation()
  const isHomepage = location.pathname === withPrefix('/')

  const [showOrder, setShowOrder] = useState(false)

  const handleShowOrder = () => setShowOrder(true)

  const isMdDown = useMatchMedia('(max-width: 767px)')

  return (
    <Container id="header" as="header">
      <div data-appear="header" data-direction="top" className={s.header}>
        {isHomepage ? (
          <Logo alt={siteTitle} />
        ) : (
          <Link to="/">
            <Logo alt={siteTitle} />
          </Link>
        )}

        <Menu variant="header" />

        {!isMdDown && (
          <div className={s.header_btn}>
            <ButtonAsk handleShowOrder={handleShowOrder} />
          </div>
        )}

        <Dropdown>
          <Dropdown.Toggle className="dropdown-toggle" as="button" />
          <Dropdown.Menu
            popperConfig={{
              modifiers: [{ name: 'offset', options: { offset: [0, 16] } }],
            }}
          >
            <Menu variant="dropdown" />
            {isMdDown && <ButtonAsk handleShowOrder={handleShowOrder} />}
          </Dropdown.Menu>
        </Dropdown>
        <div className="dropdown-overlay" />
      </div>
      <ModalOrder show={showOrder} onHide={() => setShowOrder(false)} />
    </Container>
  )
}

Header.defaultProps = {
  siteTitle: '',
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
