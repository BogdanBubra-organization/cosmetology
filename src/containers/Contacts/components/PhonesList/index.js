import React from 'react'

import * as s from './PhonesList.module.scss'

const PnonesList = ({ list }) => (
  <ul className={s.bulletedlist}>
    {list?.map((el, i) => (
      <li className={s.bulletedlist_item} key={el?.phone}>
        <a
          href={`tel:${el?.phone.replace(/[^+\d]/g, '')}`}
          className={`binct-phone-number-${i + 1}`}
        >
          {el?.phone}
        </a>
      </li>
    ))}
  </ul>
)

export default PnonesList
