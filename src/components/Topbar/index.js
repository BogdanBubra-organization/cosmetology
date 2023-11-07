import React, { useState, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import cn from 'classnames'

import Social from '~components/Social'
import AddressPin from '~components/AddressPin'
import WorkingHours from '~components/WorkingHours'

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

          <Social data={socials} variant="topbar" isWithIcon />
        </Container>
      </div>
    </div>
  )
}

export default Topbar
