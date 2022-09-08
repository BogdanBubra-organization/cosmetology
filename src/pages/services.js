import React from 'react'
import { graphql } from 'gatsby'
import Services from '~containers/Services'

const ServicesPage = ({ data }) => <Services {...data.datoCmsServicesPage} />

export const query = graphql`
  fragment ServicesPageData on DatoCmsServicesPage {
    heading
    text
    injectionsCosmetology {
      title
      descr
      services {
        slug
        name
        duration
        previewImage {
          url
        }
      }
    }
    careCosmetology {
      title
      descr
      services {
        slug
        name
        duration
        previewImage {
          url
        }
      }
    }
  }

  query ServicesPageQuery {
    datoCmsServicesPage {
      ...ServicesPageData
    }
  }
`

export default ServicesPage
