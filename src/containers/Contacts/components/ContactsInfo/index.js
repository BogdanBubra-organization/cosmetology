import React from 'react'
import Social from '~components/Social'
import MOBILE from './constants'

import * as s from './ContactsInfo.module.scss'

const ContactsInfo = () => {
  return (
    <aside className={s.contactsinfo}>
      <h5>телефони</h5>
      <ul className={s.contactsinfo_list}>
        {MOBILE.map((el) => (
          <li className={s.contactsinfo_item} key={el}>
            <a href={`tel:${el}`}>{el}</a>
          </li>
        ))}
      </ul>
      <h5>соціальні мережі</h5>
      <Social variant="contacts" isWithIcon />
    </aside>
  )
}

export default ContactsInfo
