import React from 'react'

import { Container } from 'react-bootstrap'

import * as s from './Experts.module.scss'
import ExpertsItem from './components/ExpertsItem'

const Experts = ({ title, list }) => {
  return (
    <Container as="section" className={s.experts}>
      <h2 className={s.experts_title}>{title}</h2>

      <div className={s.experts_list}>
        {list.map((item) => (
          <ExpertsItem key={item.title} {...item} />
        ))}
      </div>
    </Container>
  )
}

export default Experts
