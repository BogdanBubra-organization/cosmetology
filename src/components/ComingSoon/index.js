import React from 'react'
import { Button, Container } from 'react-bootstrap'
import Icon from '~components/Icon'

import * as s from './ComingSoon.module.scss'

const ComingSoon = () => {
  return (
    <Container as="section" className={s.soon}>
      <h1 className={s.soon_title}>
        С<i>а</i>йт знах<i>о</i>диться <i>в</i> ро<i>з</i>робц<span>і</span>
      </h1>
      <p className={s.soon_descr}>
        Якщо бажаєте записатися на процедуру&nbsp;- будь ласка, зателефонуйте
        або напишіть в любий із месенджерів:
      </p>
      <div className={s.soon_btns}>
        <Button className="btn-icon">
          <Icon name="tel" size={20} />
          Зателефонувати
        </Button>
        <Button variant="secondary">Записатись на прийом</Button>
      </div>
    </Container>
  )
}

export default ComingSoon
