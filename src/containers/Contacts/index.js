import React from 'react'

import Layout from '~components/Layout'
import S from '~components/seo'
import cn from 'classnames'

import { Container } from 'react-bootstrap'
import Lights from '~components/Lights'
import { contactsTitle, contactsWrapper } from './Contacts.module.scss'
import ContactsMap from './components/ContactsMap'
import ContactsInfo from './components/ContactsInfo'

const Contacts = () => (
  <Layout>
    <Lights />
    <S title="Наші контакти" />
    <Container className={contactsWrapper}>
      <h1 className={cn('h2', contactsTitle)}>наші контакти</h1>
      <ContactsMap />
      <ContactsInfo />
    </Container>
  </Layout>
)

export default Contacts
