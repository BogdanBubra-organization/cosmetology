import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Icon from '~components/Icon'

import * as s from './InfoBullet.module.scss'

const LINK_PROPS = { target: '_blank', rel: 'nofollow noopener noreferrer' }

const InfoBullet = (props) => {
  const { title: text, href, className, iconName, ...rest } = props

  return createElement(
    href ? 'a' : 'span',
    {
      ...rest,
      className: cn(s.infoBullet, className),
      href,
      ...(href ? LINK_PROPS : {}),
    },
    <>
      <Icon name={iconName} size={20} />
      {text}
    </>
  )
}

InfoBullet.defaultProps = {
  className: undefined,
}

InfoBullet.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
}

export default InfoBullet
