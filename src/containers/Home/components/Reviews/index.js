import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'gatsby'
import ReviewsList from '~components/ReviewsList'
import DATA from './constants'
import * as s from './Reviews.module.scss'

const Reviews = () => {
  const { title, btn } = DATA

  return (
    <Container as="section" id="reviews" className={s.reviews}>
      <h2 data-array="reviews" data-direction="top">
        {title}
      </h2>
      <ReviewsList
        className={s.reviews_list}
        limit={3}
        variant="home"
        data-array="reviews"
        data-direction="bottom"
      />
      <div
        className={s.reviews_btn}
        data-appear="reviews"
        data-direction="bottom"
      >
        <Button variant="secondary" as={Link} to={btn.link}>
          {btn.text}
        </Button>
      </div>
    </Container>
  )
}

export default Reviews
