import React from 'react'

import Social from '~components/Social'
import PnonesList from '../PhonesList'
import * as s from './ContactsInfo.module.scss'

const ContactsInfo = ({ phonesBlock, socialsBlock }) => {
  return (
    <aside className={s.contactsinfo}>
      <h5>{phonesBlock.title}</h5>
      <PnonesList list={phonesBlock.phones} />

      <h5>{socialsBlock.title}</h5>
      <Social data={socialsBlock.socials} variant="contacts" isWithIcon />
    </aside>
  )
}

export default ContactsInfo
