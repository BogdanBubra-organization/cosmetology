import React from 'react'
import cn from 'classnames'
import * as s from './MediaWrap.module.scss'

const MediaWrap = ({ media, isProduct, children }) =>
  media?.video ? (
    <div className={cn(s.media, { [s.product]: isProduct })}>
      <video src={media?.url} loop autoPlay playsInline muted />
    </div>
  ) : (
    children
  )

export default MediaWrap
