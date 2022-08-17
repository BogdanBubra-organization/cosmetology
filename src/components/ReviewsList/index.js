import React from 'react'
import cn from 'classnames'
import ReviewItem from './components/ReviewItem'
import REVIEWS from './constants'

import * as s from './ReviewsList.module.scss'

const ReviewsList = ({ list, className, variant, ...rest }) => {
  const reviews = list ?? REVIEWS

  return (
    <div className={cn(s.reviewslist, { [className]: className })} {...rest}>
      {reviews.map((review) => (
        <ReviewItem {...review} key={review.name} variant={variant} />
      ))}
    </div>
  )
}

export default ReviewsList
