import React from 'react'
import PropTypes from 'prop-types'
import InfoBullet from '~components/InfoBullet'

import * as s from './WorkingHours.module.scss'

const WorkingHours = (props) => {
  const {
    className,
    weekdaysShort,
    weekdaysFull,
    time,
    isFullWeekdayFormat,
    ...rest
  } = props

  return (
    <InfoBullet
      {...rest}
      iconName="time"
      title={
        <>
          {isFullWeekdayFormat ? weekdaysFull : weekdaysShort}{' '}
          <span className={s.time}>{time}</span>
        </>
      }
    />
  )
}

WorkingHours.defaultProps = {
  className: undefined,
  isFullWeekdayFormat: false,
}

WorkingHours.propTypes = {
  className: PropTypes.string,
  isFullWeekdayFormat: PropTypes.bool,
}

export default WorkingHours
