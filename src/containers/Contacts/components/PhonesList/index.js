import React from 'react'

import * as s from './PhonesList.module.scss'

const PnonesList = ({ list }) => (
  <ul className={s.bulletedlist}>
    {list?.map((el) => (
      <li className={s.bulletedlist_item} key={el?.phone}>
        <a href={`tel:${el?.phone.replace(/[^+\d]/g, '')}`}>{el?.phone}</a>
      </li>
    ))}
  </ul>
)

export default PnonesList
