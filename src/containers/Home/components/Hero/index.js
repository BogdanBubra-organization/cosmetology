import React, { useEffect, useRef } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Icon from '~components/Icon'
import Brands from '~components/Brands'
import * as s from './Hero.module.scss'
import heroAnim from './anim'

const Hero = (props) => {
  const {
    heading,
    text,
    image,
    btnOrder,
    btnService,
    brandsTitle,
    brands,
    isDesktop,
    isPreloaded,
  } = props

  const picRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    if (!isPreloaded && isDesktop) {
      heroAnim({ pic: picRef.current, line: lineRef.current })
    }
  }, [lineRef, picRef, isDesktop, isPreloaded])

  return (
    <section className={s.hero} id="hero">
      <Container className={s.hero_container}>
        <div className={s.hero_inner}>
          <div className={s.hero_content}>
            <h1
              className={s.hero_title}
              data-appear="hero"
              data-direction="bottom"
            >
              {heading}
            </h1>
            <p
              className={s.hero_descr}
              data-appear="hero"
              data-direction="bottom"
            >
              {text}
            </p>
          </div>
          <div className={s.hero_btns} data-appear="hero">
            <Button
              className="btn-icon"
              href="https://cbox.mobi/go/cosmetology-ua"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="tel" size={20} />
              <span className="btn-icon-text">{btnOrder}</span>
            </Button>
            <Button as={Link} to="/services" variant="secondary">
              {btnService}
            </Button>
          </div>
          <div className={s.hero_ill} ref={picRef}>
            <GatsbyImage image={getImage(image)} alt="Надання послуги" />
            <span className={s.hero_ill_line} ref={lineRef} />
          </div>
        </div>
        <Brands title={brandsTitle} list={brands} />
      </Container>
    </section>
  )
}

export default Hero
