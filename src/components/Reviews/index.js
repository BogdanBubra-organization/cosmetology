/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'gatsby'
import cn from 'classnames'
import Icon from '~components/Icon'
import DATA from './constants'
import * as s from './Reviews.module.scss'

const Reviews = ({ isHome }) => {
  const { title, list, btn } = DATA

  const reviews = isHome ? list.slice(0, 3) : list

  return (
    <Container as="section" className={cn(s.reviews, { [s.home]: isHome })}>
      {React.createElement(
        isHome ? 'h2' : 'h1',
        { className: isHome ? null : 'h2' },
        title
      )}
      <ul className={s.reviews_list}>
        {reviews.map(({ name, rating, text, date }, i) => (
          <li
            key={`l${i}`}
            className={cn(s.reviews_item, { [s.home]: isHome })}
          >
            <div className={s.reviews_heading}>
              <div className={s.reviews_pic}>
                <img src={`https://picsum.photos/62?${i}`} alt={name} />
              </div>
              <span className={s.reviews_name}>{name}</span>
              <ul className={s.reviews_rating}>
                {[...Array(5)].map((_, j) => {
                  return (
                    <li
                      className={cn(s.reviews_star, {
                        [s.empty]: rating <= j,
                      })}
                      key={`r${j}`}
                    >
                      <Icon name="star" size={15} />
                    </li>
                  )
                })}
              </ul>
            </div>
            <p className={s.reviews_text}>{text}</p>
            <div className={s.reviews_date}>
              Дата: <span>{date}</span>
            </div>
          </li>
        ))}
      </ul>
      {isHome && (
        <Button variant="secondary" as={Link} to={btn.link}>
          {btn.text}
        </Button>
      )}
    </Container>
  )
}

export default Reviews
