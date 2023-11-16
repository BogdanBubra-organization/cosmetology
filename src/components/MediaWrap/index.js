import React from 'react'
import { Ratio } from 'react-bootstrap'
import cn from 'classnames'

import * as s from './MediaWrap.module.scss'

const MediaWrap = ({ media, children, className }) =>
  media?.video ? (
    <Ratio aspectRatio={100}>
      <video
        className={cn(s.mediawrap, className)}
        src={media?.url}
        loop
        autoPlay
        playsInline
        muted
      />
    </Ratio>
  ) : (
    children
  )

export default MediaWrap
