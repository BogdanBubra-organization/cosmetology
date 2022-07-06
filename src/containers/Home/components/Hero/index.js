import React from 'react'
import { Button, Container } from 'react-bootstrap'
import Icon from '~components/Icon'
import DATA from './constants'
import * as s from './Hero.module.scss'

const Hero = () => {
  const { title, descr, btnOrder, btnServices } = DATA
  return (
    <section className={s.hero}>
      <Container className={s.hero_inner}>
        <h1 className={s.hero_title}>{title}</h1>
        <p className={s.hero_descr}>{descr}</p>
        <div className={s.hero_btns}>
          <Button className="btn-icon">
            <Icon name="tel" size={20} />
            <span className="btn-icon-text">{btnOrder}</span>
          </Button>
          <Button variant="secondary">{btnServices}</Button>
        </div>
      </Container>
    </section>
  )
}

export default Hero
