import React from 'react'
import cn from 'classnames'
import Icon from '~components/Icon'
import DATA from './constants'
import * as s from './Social.module.scss'

const Social = ({ isMessengers }) => {
  return (
    <ul className={cn(s.social, { [s.messengers]: isMessengers })}>
      {DATA.map((item) => (
        <li key={item.name}>
          <a
            {...item}
            className={
              !isMessengers ? s.social_link : 'btn btn-secondary btn-icon'
            }
          >
            <Icon name={item.name} size={!isMessengers ? 40 : 20} />
            {isMessengers && (
              <>
                <span className={s.social_name}>{item.name}</span>
                <Icon name="arrow-right" size={20} />
              </>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Social
