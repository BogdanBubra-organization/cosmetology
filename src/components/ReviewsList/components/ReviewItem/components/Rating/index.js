import React from 'react'
import cn from 'classnames'

import Icon from '~components/Icon'
import * as s from './Rating.module.scss'

const Rating = ({ rating }) => {
  return (
    <ul className={s.rating}>
      {[...Array(5)].map((_, i) => {
        return (
          <li
            className={cn(s.rating_star, {
              [s.empty]: rating <= i,
            })}
            // eslint-disable-next-line react/no-array-index-key
            key={`r${i}`}
          >
            <Icon name="star" size={15} />
          </li>
        )
      })}
    </ul>
  )
}

export default Rating
