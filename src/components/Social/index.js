import React from 'react'
import cn from 'classnames'
import Icon from '~components/Icon'
import * as s from './Social.module.scss'

const Social = ({
  data,
  variant,
  isWithIcon,
  isBtn,
  isWithText,
  iconSize = 40,
}) => (
  <ul className={cn(s.social, { [s[variant]]: variant })}>
    {data?.map(({ name, href, isExternal }) => (
      <li key={name}>
        <a
          href={href}
          target={isExternal && '_blank'}
          rel={isExternal && 'noreferrer'}
          className={isBtn ? 'btn btn-secondary btn-icon' : s.social_link}
        >
          {isWithIcon && <Icon name={name} size={iconSize} />}

          {isWithText && (
            <>
              <span className={s.social_name}>{name}</span>
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

export default Social
