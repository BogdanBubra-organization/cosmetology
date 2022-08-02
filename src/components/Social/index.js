import React from 'react'
import cn from 'classnames'
import Icon from '~components/Icon'
import DATA from './constants'
import * as s from './Social.module.scss'

const Social = ({ variant, isWithIcon, isBtn, isWithText, iconSize = 40 }) => {
  return (
    <ul className={cn(s.social, { [s[variant]]: variant })}>
      {DATA.map((item) => (
        <li key={item.name}>
          <a
            {...item}
            className={isBtn ? 'btn btn-secondary btn-icon' : s.social_link}
          >
            {isWithIcon && <Icon name={item.name} size={iconSize} />}

            {isWithText && (
              <>
                <span className={s.social_name}>{item.name}</span>
                {variant === 'messengers' && (
                  <Icon name="arrow-right" size={20} />
                )}
              </>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default Social
