import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { StaticImage } from 'gatsby-plugin-image'
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
        Якщо бажаєте записатися на процедуру&nbsp;- будь ласка, зателефонуйте
        або напишіть в любий із месенджерів:
      </p>
      <div className={cn(s.soon_btns, 'animate2')}>
        <Button className="btn-icon" onClick={() => setShowCallback(true)}>
          <Icon name="tel" size={20} />
          <span>Зателефонувати</span>
        </Button>
        <Button variant="secondary" onClick={() => setShowOrder(true)}>
          Записатись на прийом
        </Button>
      </div>
      <StaticImage
        className={cn(s.soon_pic, s.top, 'animatePic')}
        src="./img/pic1.png"
        alt="Room"
        placeholder="none"
        width={328}
        style={{ position: 'absolute' }}
      />
      <StaticImage
        className={cn(s.soon_pic, s.bottom, 'animatePic')}
        src="./img/pic2.png"
        alt="Room"
        placeholder="none"
        width={318}
        style={{ position: 'absolute' }}
      />
      <ModalCallback
        show={showCallback}
        onHide={() => setShowCallback(false)}
      />
      <ModalOrder show={showOrder} onHide={() => setShowOrder(false)} />
    </Container>
  )
}

export default ComingSoon
