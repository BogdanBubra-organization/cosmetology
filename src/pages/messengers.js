import React from 'react'
import Layout from '~components/Layout'
import S from '~components/seo'
import Messengers from '~components/Messengers'

const DESCRIPTION =
  'Напишіть нам у будь-який зручний для вас месенджер і ми з радістю вам відповімо'

const MessengersPage = () => (
  <Layout>
    <S title="Звʼязок" description={DESCRIPTION} />
    <Messengers title={DESCRIPTION} />
  </Layout>
)

export default MessengersPage
