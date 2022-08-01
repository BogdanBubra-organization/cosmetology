import React from 'react'
import cn from 'classnames'
import Icon from '~components/Icon'
import DATA from './constants'
import * as s from './Social.module.scss'

const Social = ({ variant, isWithIcon }) => {
  return (
    <ul className={cn(s.social, { [s[variant]]: variant })}>
      {DATA.map((item) => (
        <li key={item.name}>
          <a
            {...item}
            className={
              variant === 'footer'
                ? s.social_link
                : 'btn btn-secondary btn-icon'
            }
          >
            {isWithIcon && (
              <Icon name={item.name} size={variant === 'footer' ? 40 : 20} />
            )}

            {variant !== 'footer' && (
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
