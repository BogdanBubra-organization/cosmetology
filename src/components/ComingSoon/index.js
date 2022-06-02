import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import cn from 'classnames'
import Icon from '~components/Icon'
import ModalCallback from '~components/ModalCallback'
import ModalOrder from '~components/ModalOrder'
import * as s from './ComingSoon.module.scss'

const ComingSoon = () => {
  const [showCallback, setShowCallback] = useState(false)
  const [showOrder, setShowOrder] = useState(false)

  return (
    <Container as="section" className={s.soon}>
      <h1 className={cn(s.soon_title, 'animate')}>
        С<i>а</i>йт знах<i>о</i>диться <i>в</i> ро<i>з</i>робц<span>і</span>
      </h1>
      <p className={cn(s.soon_descr, 'animate2')}>
        Якщо бажаєте записатися на процедуру, будь ласка, зателефонуйте або
        напишіть y будь-який месенджер:
      </p>
      <div className={cn(s.soon_btns, 'animate2')}>
        <Button className="btn-icon" onClick={() => setShowCallback(true)}>
          <Icon name="tel" size={20} />
          <span className="btn-icon-text">Зателефонувати</span>
        </Button>
        <Button variant="secondary" onClick={() => setShowOrder(true)}>
          Записатись на прийом
        </Button>
      </div>
      <ModalCallback
        show={showCallback}
        onHide={() => setShowCallback(false)}
      />
      <ModalOrder show={showOrder} onHide={() => setShowOrder(false)} />
    </Container>
  )
}

export default ComingSoon
