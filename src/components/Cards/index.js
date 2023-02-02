import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'gatsby'
import cn from 'classnames'

import { SERVICE_PAGE_SLUG } from '~constants'

import * as s from './Cards.module.scss'

const Cards = ({ data, variant, isPricesPage, ...rest }) => {
  const servicePageSlug = SERVICE_PAGE_SLUG[+!!isPricesPage]

  return (
    <ul className={cn(s.cards, { [s[variant]]: variant })} {...rest}>
      {data?.map(({ slug, name, duration, previewImage }) => {
        const servicePageUrl = `/${servicePageSlug}/${slug}`

        return (
          <li key={slug} className={s.cards_item}>
            <div className={s.cards_heading}>
              <span className={s.cards_name}>{name}</span>
              {duration && <span className={s.cards_label}>{duration}</span>}
            </div>
            <div className={s.cards_pic}>
              <img
                src={previewImage?.url}
                alt={name}
                loading="lazy"
                width="100%"
                height="100%"
              />
            </div>
            <div className={s.cards_btns}>
              <Button as={Link} to={servicePageUrl}>
                Записатись
              </Button>
              <Button as={Link} variant="secondary" to={servicePageUrl}>
                Детальніше
              </Button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Cards
