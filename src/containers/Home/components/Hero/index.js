import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import Icon from '~components/Icon'
import Brands from '~components/Brands'
import ModalOrder from '~components/ModalOrder'
import DATA from './constants'
import * as s from './Hero.module.scss'

const Hero = () => {
  const { title, descr, btnOrder, btnServices } = DATA

  const [showOrder, setShowOrder] = useState(false)

  return (
    <section className={s.hero}>
      <Container className={s.hero_container}>
        <div className={s.hero_inner}>
          <div className={s.hero_content}>
            <h1 className={s.hero_title}>{title}</h1>
            <p className={s.hero_descr}>{descr}</p>
            <div className={s.hero_btns}>
              <Button className="btn-icon" onClick={() => setShowOrder(true)}>
                <Icon name="tel" size={20} />
                <span className="btn-icon-text">{btnOrder}</span>
              </Button>
              <Button as={Link} to="/services" variant="secondary">
                {btnServices}
              </Button>
            </div>
          </div>
          <div className={s.hero_ill}>
            <StaticImage
              src="./img/hero.jpg"
              alt="Надання послуги"
              quality={100}
              placeholder="none"
              loading="eager"
            />
            <span className={s.hero_ill_line} />
          </div>
        </div>
        <Brands />
      </Container>
      <ModalOrder
        variant="signup"
        show={showOrder}
        onHide={() => setShowOrder(false)}
      />
    </section>
  )
}

export default Hero
