import React from 'react'
import Icon from '~components/Icon'

import * as s from './AddressPin.module.scss'

const AddressPin = () => {
  return (
    <a
      className={s.addresspin}
      href="https://goo.gl/maps/3Z9kQF8BnPTp7f9h8"
      target="_blank"
      rel="noreferrer"
    >
      <Icon name="mark" size={20} />
      м.Чернігів, вул. Гоголя, 3
    </a>
  )
}

export default AddressPin
