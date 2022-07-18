import React from 'react'
import cn from 'classnames'
import ReviewItem from './components/ReviewItem'
import REVIEWS from './constants'

import * as s from './ReviewsList.module.scss'

const ReviewsList = ({ limit, className }) => {
  const reviews = limit ? REVIEWS.slice(0, limit) : REVIEWS

  return (
    <div className={cn(s.reviewslist, { [className]: className })}>
      {reviews.map((el, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <ReviewItem {...el} key={`l${i}`} index={i} />
      ))}
    </div>
  )
}

export default ReviewsList
