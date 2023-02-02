/* eslint-disable no-shadow */
import React from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'
import Icon from '~components/Icon'
import { SERVICE_PAGE_SLUG } from '~constants'
import * as s from './CategoriesPreview.module.scss'

const CategoriesPreview = ({ data }) => {
  const isOdd = !!(data.length % 2)

  return (
    <ul className={cn(s.preview, { [s.odd]: isOdd })}>
      {data.map(({ slug, title, descr, image }) => (
        <li key={title}>
          <Link
            to={`/${SERVICE_PAGE_SLUG[0]}/${slug}`}
            className={s.preview_link}
          >
            <span className={s.preview_title}>{title}</span>

            <span className={s.preview_bottom}>
              <span className={s.preview_descr}>{descr}</span>

              <span className={s.preview_icon}>
                <Icon name="arrow-right-big" />
              </span>
            </span>

            <span className={s.preview_pic}>
              <img
                width="196"
                height="196"
                src={image?.url}
                alt={title}
                loading="lazy"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default CategoriesPreview
