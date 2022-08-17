import React from 'react'
import { graphql } from 'gatsby'
import Reviews from '~containers/Reviews'

const ReviewsPage = ({ data }) => {
  return <Reviews {...data.datoCmsReviewsPage} />
}

export const query = graphql`
  query ReviewsPageQuery {
    datoCmsReviewsPage {
      heading
      reviews {
        id
        name
        rating
        avatar {
          gatsbyImageData(
            height: 62
            width: 62
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
        text
        date
      }
    }
  }
`

export default ReviewsPage
