import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

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

  return (
    <div className={s.topbar}>
      <div className={s.topbar_info}>
        <AddressPin {...address} />
        <WorkingHours {...workingHours} />
      </div>

      <ul className={s.topbar_phones}>
        {phones?.map((el) => (
          <li key={el?.phone}>
            <a href={`tel:${el?.phone.replace(/[^+\d]/g, '')}`}>{el?.phone}</a>
          </li>
        ))}
      </ul>

      <Social data={socials} variant="topbar" isWithIcon />
    </div>
  )
}

export default Topbar
