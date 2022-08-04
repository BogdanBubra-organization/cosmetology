import React from 'react'

import * as s from './BulletedList.module.scss'

const BulletedList = ({ list = [], isLink }) => {
  return (
    <ul className={s.bulletedlist}>
      {list.map((el) => (
        <li className={s.bulletedlist_item} key={el}>
          {isLink ? <a href={`tel:${el}`}>{el}</a> : el}
        </li>
      ))}
    </ul>
  )
}

export default BulletedList
