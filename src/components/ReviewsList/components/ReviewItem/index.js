import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import cn from 'classnames'
import Rating from './components/Rating'

import * as s from './ReviewItem.module.scss'

const ReviewItem = ({ name, rating, avatar, text, date, variant }) => {
  return (
    <div className={cn(s.reviewitem, { [s[variant]]: variant })}>
      <div className={s.reviewitem_heading}>
        <div className={s.reviewitem_pic}>
          <GatsbyImage image={getImage(avatar)} alt={name} />
        </div>
        <span className={s.reviewitem_name}>{name}</span>
        <Rating rating={rating} />
      </div>
      <p className={s.reviewitem_text}>{text}</p>
      <p className={s.reviewitem_date}>
        Дата:{' '}
        <time className={s.reviewitem_time} dateTime={date}>
          {date}
        </time>
      </p>
    </div>
  )
}

export default ReviewItem
