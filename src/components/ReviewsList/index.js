/* eslint-disable react/no-array-index-key */
import React from 'react'
import cn from 'classnames'

import ReviewItem from './components/ReviewItem'
import * as s from './ReviewsList.module.scss'

const ReviewsList = ({ reviews, className, variant, ...rest }) => (
  <div className={cn(s.reviewslist, { [className]: className })} {...rest}>
    {reviews?.map((review, i) => (
      <ReviewItem {...review} key={`r${i}`} variant={variant} />
    ))}
  </div>
)

export default ReviewsList
