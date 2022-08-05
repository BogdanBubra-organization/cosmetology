import React from 'react'
import cn from 'classnames'

import * as s from './BulletedList.module.scss'

const BulletedList = ({ list = [], isLink, withPunctuation, className }) => {
  return (
    <ul className={cn(s.bulletedlist, { [className]: className })}>
      {list.map((el, i) => (
        <li className={s.bulletedlist_item} key={el}>
          {isLink ? <a href={`tel:${el}`}>{el}</a> : el}
          {withPunctuation && i + 1 < list.length ? ';' : '.'}
        </li>
      ))}
    </ul>
  )
}

export default BulletedList
