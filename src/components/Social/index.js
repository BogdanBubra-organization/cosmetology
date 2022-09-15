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
  className,
}) => (
  <ul className={cn(s.social, { [s[variant]]: variant }, className)}>
    {data?.map(({ name, href, isExternal }) => (
      <li key={name}>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
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
