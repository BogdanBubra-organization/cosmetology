import SEO from '~components/seo'
import React from 'react'
import { graphql } from 'gatsby'
import Services from '~containers/Services'

const ServicesPage = ({ data }) => (
  <Services {...data.datoCmsServicesPage} isPricesPage />
)

export const query = graphql`
  query PricesPageQuery {
    datoCmsServicesPage {
      ...ServicesPageData
    }
  }
`

export default ServicesPage

export const Head = () => <SEO title="Послуги" />
