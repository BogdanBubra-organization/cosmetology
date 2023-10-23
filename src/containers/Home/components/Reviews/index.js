/* eslint-disable camelcase */
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import ReviewsList from '~components/ReviewsList'
import Icon from '~components/Icon'
import Rating from '~components/Rating'
import * as s from './Reviews.module.scss'

const Reviews = ({ heading, linkText, googlePlace }) => {
  const { rating, user_ratings_total, childrenGooglePlacesReview } = googlePlace
  return (
    <Container as="section" id="reviews" className={s.reviews}>
      <h2 data-array="reviews" data-direction="top">
        {heading}
      </h2>

      <div className={s.reviews_place}>
        <div>
          <div className={s.reviews_place_title}>
            <Icon name="google" size={[86, 35]} /> Рейтинг
          </div>

          <div className={s.reviews_place_info}>
            <div className={s.reviews_place_rating}>
              {rating}
              <Rating rating={rating} isBig />
            </div>

            <span>{user_ratings_total} відгуків</span>
          </div>
        </div>

        <Button
          target="_blank"
          rel="noreferrer"
          href="https://www.google.com/search?hl=uk-UA&gl=ua&q=Cosmetology+Clinic,+%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%93%D0%BE%D0%B3%D0%BE%D0%BB%D1%8F,+3,+%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B3%D1%96%D0%B2,+%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B3%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+14000&ludocid=12359962623073036133&lsig=AB86z5V1GmUv6ZUWFj2CmmQ9KJ8I&hl=uk&gl=UA#lrd=0x46d5499cc0f8a33b:0xab876885115fa765,3"
        >
          Залишити відгук
        </Button>
      </div>

      <ReviewsList
        reviews={childrenGooglePlacesReview.slice(0, 3)}
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
        <Button
          variant="secondary"
          target="_blank"
          rel="noreferrer"
          href="https://www.google.com/search?hl=uk-UA&gl=ua&q=Cosmetology+Clinic,+%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%93%D0%BE%D0%B3%D0%BE%D0%BB%D1%8F,+3,+%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B3%D1%96%D0%B2,+%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B3%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+14000&ludocid=12359962623073036133&lsig=AB86z5V1GmUv6ZUWFj2CmmQ9KJ8I&hl=uk&gl=UA#lrd=0x46d5499cc0f8a33b:0xab876885115fa765,1"
        >
          {linkText}
        </Button>
      </div>
    </Container>
  )
}

export default Reviews
