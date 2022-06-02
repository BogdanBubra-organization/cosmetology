import React from 'react'
import { Button } from 'react-bootstrap'
import cn from 'classnames'
import Icon from '~components/Icon'
import DATA from './constants'
import * as s from './Social.module.scss'

const Social = ({ variant }) => {
  return (
    <ul className={cn(s.social, { [s[variant]]: variant })}>
      {DATA.map((item) => (
        <li key={item.name}>
          <Button
            {...item}
            variant="secondary"
            size={variant !== 'messengers' && 'sm'}
            className="btn-icon"
          >
            <Icon name={item.name} size={20} />
            <span className={s.social_name}>{item.name}</span>
            {variant === 'messengers' && <Icon name="arrow-right" size={20} />}
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default Social
