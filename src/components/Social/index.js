import React from 'react'
import { Button } from 'react-bootstrap'
import Icon from '~components/Icon'
import DATA from './constants'
import * as s from './Social.module.scss'

const Social = () => {
  return (
    <ul className={s.social}>
      {DATA.map(({ name, link }) => (
        <li key={name}>
          <Button
            variant="secondary"
            size="sm"
            className="btn-icon"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name={name} size={20} />
            <span className={s.social_name}>{name}</span>
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default Social
