import React from 'react'
import { Button } from 'react-bootstrap'
import Icon from '~components/Icon'
import DATA from './constants'
import * as s from './Social.module.scss'

const Social = () => {
  return (
    <ul className={s.social}>
      {DATA.map((item) => (
        <li key={item.name}>
          <Button {...item} variant="secondary" size="sm" className="btn-icon">
            <Icon name={item.name} size={20} />
            <span className={s.social_name}>{item.name}</span>
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default Social
