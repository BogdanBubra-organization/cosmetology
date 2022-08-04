import React from 'react'
import AddresPin from '~components/AddressPin'

import * as s from './ContactsMap.module.scss'

const ContactsMap = () => {
  return (
    <section className={s.contactsmap}>
      <h5>Адреса</h5>
      <AddresPin />
      <div className={s.contactsmap_wrapper}>
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.595055392606!2d31.28298301647969!3d51.50229817963429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d5488f6a76ac55%3A0x3d833102b7db780e!2sHoholya%20St%2C%203%2C%20Chernihiv%2C%20Chernihivs&#39;ka%20oblast%2C%2014000!5e0!3m2!1sen!2sua!4v1658671868973!5m2!1sen!2sua"
          allowFullScreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className={s.contactsmap_map}
        />
      </div>
    </section>
  )
}

export default ContactsMap
