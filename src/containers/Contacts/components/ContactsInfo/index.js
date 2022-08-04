import React from 'react'
import BulletedList from '~components/BulletedList'
import Social from '~components/Social'
import MOBILE from './constants'

import * as s from './ContactsInfo.module.scss'

const ContactsInfo = () => {
  return (
    <aside className={s.contactsinfo}>
      <h5>Телефони</h5>
      <BulletedList list={MOBILE} isLink />
      <h5>Соціальні мережі</h5>
      <Social variant="contacts" isWithIcon />
    </aside>
  )
}

export default ContactsInfo
