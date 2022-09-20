import React, { useEffect, useState, useRef } from 'react'
import cn from 'classnames'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import { Link } from 'gatsby'
import Icon from '~components/Icon'
import ModalCallback from '~components/ModalCallback'
import * as s from './NavBtns.module.scss'

const NavBtns = ({ isServicesPage }) => {
  const [showCallback, setShowCallback] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [nav, setNav] = useState({ fixed: false, fixPosition: 0 })

  const navRef = useRef(null)

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowNav(true)
    } else {
      setShowNav(false)
    }

    const footer = document.querySelector('#footer')
    const footerOffsetTop = footer.offsetTop
    const footerHeight = footer.clientHeight

    if (footerOffsetTop < window.innerHeight + window.scrollY) {
      setNav({ fixed: true, fixPosition: `${footerHeight}px` })
    } else {
      setNav({ fixed: false, fixPosition: 0 })
    }
  }

  gsap.registerPlugin(ScrollToPlugin)

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: 0, ease: 'power2' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      <div
        ref={navRef}
        className={cn(s.nav, { [s.show]: showNav }, { [s.fixed]: nav.fixed })}
        style={{ bottom: nav.fixPosition }}
      >
        <div className={s.nav_btns}>
          <div className={s.nav_btnWrap}>
            <button
              onClick={() => setShowCallback(true)}
              className={cn(s.nav_btn, s.tel)}
              type="button"
            >
              <Icon name="tel" />
            </button>
          </div>

          {!isServicesPage && (
            <div className={s.nav_btnWrap}>
              <Link className={s.nav_btn} to="/services">
                <Icon name="grid" />
              </Link>
            </div>
          )}
        </div>

        <div className={cn(s.nav_btnWrap, s.up)}>
          <button onClick={scrollToTop} type="button" className={s.nav_btn}>
            <Icon name="arrow-up" />
          </button>
        </div>
      </div>

      <ModalCallback
        show={showCallback}
        onHide={() => setShowCallback(false)}
      />
    </>
  )
}

export default NavBtns
