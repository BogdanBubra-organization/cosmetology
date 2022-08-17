import React from 'react'
import { graphql } from 'gatsby'
import Services from '~containers/Services'

const ServicesPage = ({ data }) => <Services {...data.datoCmsServicesPage} />

export const query = graphql`
  query ServicesPageQuery {
    datoCmsServicesPage {
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
  }
`

export default ServicesPage
