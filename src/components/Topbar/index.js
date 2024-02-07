import React, { useState, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import cn from 'classnames'

import Social from '~components/Social'
import AddressPin from '~components/AddressPin'
import WorkingHours from '~components/WorkingHours'
import Icon from '~components/Icon'
import Modal from '~components/Modal'

import Search from '~components/Search'
import * as s from './Topbar.module.scss'

const Topbar = () => {
  const data = useStaticQuery(graphql`
    query {
      datoCmsContactsPage {
        phonesBlock {
          phones {
            phone
          }
        }
      }
      datoCmsLayout {
        footer {
          address {
            title
            href
          }
          workingHours {
            weekdaysShort
            time
          }
          socials {
            name
            href
            isExternal
          }
        }
      }
    }
  `)

  const { phones } = data.datoCmsContactsPage.phonesBlock[0]
  const { address, workingHours, socials } = data.datoCmsLayout.footer[0]

  const topbarRef = useRef(null)

  const [hide, setHide] = useState(false)
  const [height, setHeight] = useState(false)

  const [show, setShow] = useState(false)

  useEffect(() => {
    let lastScrollPosition = window.scrollY

    const topbarHeight = topbarRef.current.offsetHeight
    setHeight(topbarHeight)

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY

      if (
        currentScrollPosition > lastScrollPosition &&
        currentScrollPosition > 16
      ) {
        setHide(true)
      } else if (currentScrollPosition < lastScrollPosition) {
        setHide(false)
      }

      lastScrollPosition = currentScrollPosition
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div style={{ height: `${height}px` }}>
        <div ref={topbarRef} className={cn(s.topbar, { [s.hide]: hide })}>
          <Container className={s.topbar_inner}>
            <div className={s.topbar_info}>
              <AddressPin {...address} />
              <WorkingHours {...workingHours} />
            </div>
            <span className={s.topbar_phone}>
              <a
                href={`tel:${phones[0].phone.replace(/[^+\d]/g, '')}`}
                className="binct-phone-number-1"
              >
                {phones[0].phone}
              </a>
            </span>

            <div className={s.topbar_right}>
              <button
                type="button"
                onClick={() => setShow(true)}
                className={s.topbar_search}
              >
                <Icon name="search" size={40} />
              </button>
              <Social data={socials} variant="topbar" isWithIcon withSearch />
            </div>
          </Container>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)} variant="search">
        <Search />
      </Modal>
    </>
  )
}

export default Topbar
