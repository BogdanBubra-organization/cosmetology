import React, { useEffect, useState, useRef } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import cn from 'classnames'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import Icon from '~components/Icon'
import * as s from './NavBtns.module.scss'

gsap.registerPlugin(ScrollToPlugin)

const NavBtns = ({ isServicesPage }) => {
  const data = useStaticQuery(graphql`
    query {
      datoCmsContactsPage {
        phonesBlock {
          phones {
            phone
          }
        }
      }
    }
  `)

  const { phone } = data.datoCmsContactsPage.phonesBlock[0].phones[0]

  const [showNav, setShowNav] = useState(false)
  const [fixed, setFixed] = useState(false)

  const navRef = useRef(null)

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowNav(true)
    } else {
      setShowNav(false)
    }

    const footer = document.querySelector('#footer')
    const footerOffsetTop = footer.offsetTop

    if (footerOffsetTop < window.innerHeight + window.scrollY) {
      setFixed(true)
    } else {
      setFixed(false)
    }
  }

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
    <div
      ref={navRef}
      className={cn(s.nav, { [s.show]: showNav }, { [s.fixed]: fixed })}
    >
      <div className={s.nav_btns}>
        <a
          href={`tel:${phone.replace(/[^+\d]/g, '')}`}
          className={cn(s.nav_btn, s.tel)}
        >
          <Icon name="tel" />
        </a>

        {!isServicesPage && (
          <Link className={s.nav_btn} to="/services">
            <Icon name="grid" />
          </Link>
        )}
      </div>

      <button
        onClick={scrollToTop}
        type="button"
        className={cn(s.nav_btn, s.up)}
      >
        <Icon name="arrow-up" />
      </button>
    </div>
  )
}

export default NavBtns
