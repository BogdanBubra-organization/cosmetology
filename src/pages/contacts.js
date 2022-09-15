import React from 'react'
import { graphql } from 'gatsby'

import Contacts from '~containers/Contacts'

const ContactsPage = ({ data }) => <Contacts {...data.datoCmsContactsPage} />

export const query = graphql`
  query ContactsPageQuery {
    datoCmsContactsPage {
      heading
      map {
        title
        address {
          title
          href
        }
        workingHours {
          weekdaysFull
          time
        }
        link
      }
      phonesBlock {
        title
        phones {
          phone
        }
      }
      socialsBlock {
        title
        socials {
          name
          href
        }
      }
    }
  }
`

export default ContactsPage
