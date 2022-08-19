import React from 'react'
import { graphql } from 'gatsby'

import Messengers from '~containers/Messengers'

const MessengersPage = ({ data }) => {
  return <Messengers {...data.datoCmsMessengersPage} />
}

export const query = graphql`
  query MessengersPageQuery {
    datoCmsMessengersPage {
      text
      socials {
        name
        href
        isExternal
      }
      leftImage {
        gatsbyImageData(
          width: 318
          placeholder: NONE
          forceBlurhash: true
          imgixParams: { fit: "crop", auto: "compress,format" }
        )
      }
      rightImage {
        gatsbyImageData(
          width: 328
          placeholder: NONE
          forceBlurhash: true
          imgixParams: { fit: "crop", auto: "compress,format" }
        )
      }
    }
  }
`
export default MessengersPage
