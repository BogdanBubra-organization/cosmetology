/* eslint-disable camelcase */
import React from 'react'
import cn from 'classnames'
import Rating from '~components/Rating'

import * as s from './ReviewItem.module.scss'

const ReviewItem = ({
  author_name,
  rating,
  profile_photo_url,
  text,
  variant,
}) => {
  return (
    <div className={cn(s.reviewitem, { [s[variant]]: variant })}>
      <div className={s.reviewitem_heading}>
        <div className={s.reviewitem_pic}>
          <img
            width="64"
            height="64"
            src={profile_photo_url}
            alt={author_name}
          />
        </div>
        <span className={s.reviewitem_name}>{author_name}</span>
        <Rating rating={rating} />
      </div>
      <p className={s.reviewitem_text}>{text}</p>
    </div>
  )
}

export default ReviewItem
