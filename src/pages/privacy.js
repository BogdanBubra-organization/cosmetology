import React from 'react'
import { graphql } from 'gatsby'

import Privacy from '~containers/Privacy'

const PrivacyPage = ({ data }) => <Privacy {...data.datoCmsPrivacyPolicyPage} />

export const query = graphql`
  query PrivacyPageQuery {
    datoCmsPrivacyPolicyPage {
      title
      content {
        value
      }
    }
  }
`

export default PrivacyPage
