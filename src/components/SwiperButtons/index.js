import cn from 'classnames'
import React from 'react'
import { Button } from 'react-bootstrap'
import BUTTONS from './constants'

const SwiperButtons = ({ children, className }) => {
  return BUTTONS.map((side) => (
    <Button
      key={side}
      variant="secondary"
      aria-label={side}
      className={cn(
        'swiper-button',
        'swiper-button-disabled',
        `swiper-button-${side}`,
        className
      )}
    >
      {children}
    </Button>
  ))
}

export default SwiperButtons
