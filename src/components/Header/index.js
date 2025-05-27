import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Dropdown } from 'react-bootstrap'
import { useLocation } from '@reach/router'
import { withPrefix, Link } from 'gatsby'
import cn from 'classnames'

import useMatchMedia from '~hooks/useMatchMedia'
import Menu from '~components/Menu'
import Topbar from '~components/Topbar'
import * as s from './style.module.scss'

const ModalOrder = React.lazy(() =>
  import(/* webpackChunkName: "modal-order" */ '~components/ModalOrder')
)

const Logo = ({ url, alt }) => (
  <img width="244" height="52" src={url} alt={alt} />
)

const ButtonAsk = ({ handleShowOrder }) => (
  <Button onClick={handleShowOrder} variant="secondary">
    Маєте питання?
  </Button>
)

const Header = ({ logo, menu, isNavHidden, categories }) => {
  const dropdownRef = useRef(null)
  const location = useLocation()
  const isHomepage = location.pathname === withPrefix('/')
  const [show, setShow] = useState(false)

  const [showOrder, setShowOrder] = useState(false)

  const isMdDown = useMatchMedia('(max-width: 767.98px)')
  const isLgDown = useMatchMedia('(max-width: 1023.98px)')

  const handleToggle = (state) => {
    document.querySelector('body').style.overflow = state ? 'hidden' : 'auto'
    setShow(state)
  }

  const handleShowOrderMd = () => {
    handleToggle()
    setShowOrder(true)
  }

  useEffect(() => {
    if (sessionStorage.getItem('isPreloaded')) {
      document.querySelector('body').style.overflow = null
    }
  }, [])

  useEffect(() => {
    if (!isLgDown && sessionStorage.getItem('isPreloaded')) {
      document.querySelector('body').style.overflow = 'auto'
      setShow(false)
    }
  }, [isLgDown])

  return (
    <header id="header">
      <div
        data-appear="header"
        data-direction="top"
        className={cn(s.header, { [s.isNavHidden]: isNavHidden })}
      >
        <Topbar />

        <Container>
          <div className={cn(s.header_inner, { [s.isNavHidden]: isNavHidden })}>
            {isHomepage ? (
              <Logo {...logo} />
            ) : (
              <Link to="/">
                <Logo {...logo} />
              </Link>
            )}

            {!isNavHidden && (
              <Menu categories={categories} data={menu} variant="header" />
            )}

            {!isMdDown && (
              <div className={s.header_btn}>
                <ButtonAsk handleShowOrder={() => setShowOrder(true)} />
              </div>
            )}

            {(!isNavHidden || isMdDown) && (
              <Dropdown show={show} onToggle={handleToggle} ref={dropdownRef}>
                <Dropdown.Toggle className="dropdown-toggle" as="button" />
                <Dropdown.Menu
                  popperConfig={{
                    modifiers: [
                      { name: 'offset', options: { offset: [0, 16] } },
                    ],
                  }}
                >
                  <div className="dropdown-inner">
                    {!isNavHidden && (
                      <Menu
                        categories={categories}
                        data={menu}
                        variant="dropdown"
                      />
                    )}
                    {isMdDown && (
                      <ButtonAsk handleShowOrder={handleShowOrderMd} />
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <div className="dropdown-overlay" />
          </div>
        </Container>
      </div>
      <ModalOrder
        show={showOrder}
        onHide={() => setShowOrder(false)}
        title="Запитайте нас"
      />
    </header>
  )
}

export default Header
