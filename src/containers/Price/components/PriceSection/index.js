/* eslint-disable react/no-array-index-key */
import React, { createElement, useState } from 'react'
import { Link } from 'gatsby'
import { Collapse } from 'react-bootstrap'
import useMatchMedia from '~hooks/useMatchMedia'
import cn from 'classnames'
import * as s from './PriceSection.module.scss'

const PriceSection = ({ title, items, note }) => {
  const isMobile = useMatchMedia('(max-width: 767px)')
  const [open, setOpen] = useState(!isMobile)

  return (
    <div className={s.section}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(s.section_btn, { [s.show]: open })}
      >
        <h2 className={cn('h4', s.section_title)}>{title}</h2>
      </button>

      <Collapse in={open}>
        <div>
          <div className={s.section_list}>
            {items.map(
              (
                {
                  title: itemTitle,
                  description,
                  price,
                  pricePromo,
                  priceDescription,
                  link,
                },
                i
              ) => (
                <div key={itemTitle + i} className={s.section_item}>
                  <div>
                    {createElement(
                      link ? Link : 'span',
                      link
                        ? {
                            to: `/services/${link.slug}`,
                          }
                        : {},
                      itemTitle
                    )}

                    {description && (
                      <p className={s.section_descr}>{description}</p>
                    )}

                    {priceDescription && (
                      <p className={cn(s.section_descr, s.sub)}>
                        {priceDescription}
                      </p>
                    )}
                  </div>

                  <div className={s.section_price}>
                    <span className={cn({ [s.section_priceOld]: pricePromo })}>
                      {price}
                    </span>

                    {pricePromo && pricePromo}
                  </div>
                </div>
              )
            )}
          </div>

          {note && <p className={s.section_note}>{note}</p>}
        </div>
      </Collapse>
    </div>
  )
}

export default PriceSection
