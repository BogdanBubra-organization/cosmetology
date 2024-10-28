import React from 'react'
import { graphql } from 'gatsby'

import Events from '~containers/Events'

const EventsPage = ({ data }) => {
  const { btnOrder } = data.datoCmsHomepage.hero[0]
  return <Events btnOrder={btnOrder} {...data.datoCmsEventsPage} />
}

export const query = graphql`
  query EventsPageQuery {
    datoCmsEventsPage {
      title
      pictures {
        alt
        basename
        gatsbyImageData(
          placeholder: NONE
          forceBlurhash: true
          width: 1130
          imgixParams: { fit: "crop", auto: "compress,format" }
          sizes: "(max-width: 767.98px) calc(100vw - 16px * 2), (max-width: 1199.98px) calc(100vw - 24px * 2), (max-width: 1399.98px) calc(100vw - 32px * 2 - 16px), 680px"
        )
      }
    }

    datoCmsHomepage {
      hero {
        btnOrder
      }
    }
  }
`

export default EventsPage
