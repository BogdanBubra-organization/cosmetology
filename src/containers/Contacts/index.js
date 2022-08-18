import React from 'react'
import { Container } from 'react-bootstrap'
import cn from 'classnames'

import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import ContactsMap from './components/ContactsMap'
import ContactsInfo from './components/ContactsInfo'
import { contactsTitle, contactsWrapper } from './Contacts.module.scss'

const Contacts = ({ heading, map, phonesBlock, socialsBlock }) => (
  <Layout>
    <Lights />
    <S title="Наші контакти" />
    <Container className={contactsWrapper}>
      <h1 className={cn('h2', contactsTitle)}>{heading}</h1>
      <ContactsMap {...map[0]} />
      <ContactsInfo
        phonesBlock={phonesBlock[0]}
        socialsBlock={socialsBlock[0]}
      />
    </Container>
  </Layout>
)

export default Contacts
