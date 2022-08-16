import React from 'react'
import Icon from '~components/Icon'

import * as s from './AddressPin.module.scss'

const AddressPin = (props) => {
  const { title, href } = props || {}
  return (
    <a className={s.addresspin} href={href} target="_blank" rel="noreferrer">
      <Icon name="mark" size={20} />
      {title}
    </a>
  )
}

export default AddressPin
