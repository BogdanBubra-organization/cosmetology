import React from 'react'
import cn from 'classnames'

import * as s from './MediaWrap.module.scss'

const MediaWrap = ({ media, className, children }) =>
  media?.video ? (
    <video
      className={cn(s.mediawrap, { [className]: className })}
      src={media?.url}
      loop
      autoPlay
      playsInline
      muted
    />
  ) : (
    children
  )

export default MediaWrap
