import React from 'react'
import { Link } from 'gatsby'
import { Container } from 'react-bootstrap'

import Layout from '../components/Layout'
import S from '../components/seo'

const SecondPage = () => (
  <Layout>
    <Container>
      <S title="Page two" />
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </Container>
  </Layout>
)

export default SecondPage
