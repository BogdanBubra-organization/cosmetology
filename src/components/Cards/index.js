import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'gatsby'
import cn from 'classnames'
import * as s from './Cards.module.scss'

const Cards = ({ data, variant }) => {
  return (
    <ul className={cn(s.cards, { [s[variant]]: variant })}>
      {data.map(({ node: { id, slug, name, duration, preview } }) => (
        <li key={id} className={s.cards_item}>
          <div className={s.cards_heading}>
            <span className={s.cards_name}>{name}</span>
            <span className={s.cards_label}>{duration}</span>
          </div>
          <div className={s.cards_pic}>
            <img src={preview.publicURL} alt={name} />
          </div>
          <div className={s.cards_btns}>
            <Button as={Link} to={`/services/${slug}`}>
              Записатись
            </Button>
            <Button as={Link} variant="secondary" to={`/services/${slug}`}>
              Детальніше
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Cards
