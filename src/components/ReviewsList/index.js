import React from 'react'
import cn from 'classnames'
import ReviewItem from './components/ReviewItem'
import REVIEWS from './constants'

import * as s from './ReviewsList.module.scss'

const ReviewsList = ({ limit, className, variant, ...rest }) => {
  const reviews = limit ? REVIEWS.slice(0, limit) : REVIEWS

  return (
    <div className={cn(s.reviewslist, { [className]: className })} {...rest}>
      {reviews.map((el, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <ReviewItem {...el} key={`l${i}`} index={i} variant={variant} />
      ))}
    </div>
  )
}

export default ReviewsList
