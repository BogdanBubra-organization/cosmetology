import React from 'react'

import AddresPin from '~components/AddressPin'
import * as s from './ContactsMap.module.scss'

const ContactsMap = ({ title, link, address }) => (
  <section className={s.contactsmap}>
    <h5>{title}</h5>
    <AddresPin {...address} />
    <div className={s.contactsmap_wrapper}>
      <iframe
        title="Map"
        src={link}
        allowFullScreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        className={s.contactsmap_map}
      />
    </div>
  </section>
)

export default ContactsMap
