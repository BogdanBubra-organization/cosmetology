import React from 'react'
import cn from 'classnames'

import * as s from './BulletedList.module.scss'

const BulletedList = ({ list = [], isLink, className }) => {
  return (
    <ul className={cn(s.bulletedlist, { [className]: className })}>
      {list.map((el) => (
        <li className={s.bulletedlist_item} key={el}>
          {isLink ? <a href={`tel:${el}`}>{el}</a> : el}
        </li>
      ))}
    </ul>
  )
}

export default BulletedList
