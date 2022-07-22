import React from 'react'
import cn from 'classnames'
import Rating from './components/Rating'

import * as s from './ReviewItem.module.scss'

const ReviewItem = ({ name, rating, text, date, index, variant }) => {
  return (
    <div className={cn(s.reviewitem, { [s[variant]]: variant })}>
      <div className={s.reviewitem_heading}>
        <div className={s.reviewitem_pic}>
          <img src={`https://picsum.photos/124?${index}`} alt={name} />
        </div>
        <span className={s.reviewitem_name}>{name}</span>
        <Rating rating={rating} />
      </div>
      <p className={s.reviewitem_text}>{text}</p>
      <p className={s.reviewitem_date}>
        Дата:{' '}
        <time className={s.reviewitem_time} dateTime="2022-09-13">
          {date}
        </time>
      </p>
    </div>
  )
}

export default ReviewItem
