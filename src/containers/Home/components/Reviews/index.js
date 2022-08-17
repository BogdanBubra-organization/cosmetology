import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'gatsby'
import ReviewsList from '~components/ReviewsList'
import * as s from './Reviews.module.scss'

const Reviews = ({ heading, reviews, link }) => {
  return (
    <Container as="section" id="reviews" className={s.reviews}>
      <h2 data-array="reviews" data-direction="top">
        {heading}
      </h2>
      <ReviewsList
        list={reviews}
        className={s.reviews_list}
        variant="home"
        data-array="reviews"
        data-direction="bottom"
      />
      <div
        className={s.reviews_btn}
        data-appear="reviews"
        data-direction="bottom"
      >
        <Button variant="secondary" as={Link} to="/reviews">
          {link}
        </Button>
      </div>
    </Container>
  )
}

export default Reviews
