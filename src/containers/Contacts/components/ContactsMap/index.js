import React from 'react'

import AddressPin from '~components/AddressPin'
import WorkingHours from '~components/WorkingHours'
import * as s from './ContactsMap.module.scss'

const ContactsMap = ({ title, link, address, workingHours }) => (
  <section className={s.contactsmap}>
    <h5 className={s.heading}>{title}</h5>
    <div className={s.gridInfoBadges}>
      <AddressPin {...address} />
      <WorkingHours {...workingHours} isFullWeekdayFormat />
    </div>
    <div className={s.contactsmap_wrapper}>
      <iframe
        title="Map"
        src={link}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={s.contactsmap_map}
      />
    </div>
  </section>
)

export default ContactsMap
