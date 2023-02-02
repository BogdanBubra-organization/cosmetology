/* eslint-disable no-shadow */
import React, { useState } from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'
import { Collapse } from 'react-bootstrap'
import Icon from '~components/Icon'
import { SERVICE_PAGE_SLUG } from '~constants'
import useMatchMedia from '~hooks/useMatchMedia'
import * as s from './ServicesItem.module.scss'

const ServicesItem = ({ title, categories }) => {
  const [open, setOpen] = useState(false)
  const isLgDown = useMatchMedia('(max-width: 1023.98px)')

  const handleClick = () => setOpen((prev) => !prev)

  return (
    <div className={cn('nav-link', s.item, { [s.active]: open })}>
      <button
        type="button"
        className={s.item_heading}
        onClick={isLgDown ? handleClick : null}
      >
        {title} <Icon name="chevron-down" />
      </button>

      <Collapse in={open}>
        <div className={s.item_inner}>
          <ul className={s.item_submenu}>
            {categories.map(({ slug, title, descr, image }) => (
              <li key={title}>
                <Link
                  className={s.item_link}
                  to={`/${SERVICE_PAGE_SLUG[0]}/${slug}`}
                >
                  <img
                    width="72"
                    height="72"
                    src={image?.url}
                    alt={title}
                    loading="lazy"
                    className={s.item_pic}
                  />

                  <span className={s.item_content}>
                    <span className={s.item_title}>{title}</span>
                    <span className={s.item_descr}>{descr}</span>
                  </span>

                  <span className={s.item_icon}>
                    <Icon name="arrow-right-big" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
    </div>
  )
}

export default ServicesItem
