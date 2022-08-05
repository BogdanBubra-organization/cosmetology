import React, { useEffect, useRef } from 'react'
import { Button, Container } from 'react-bootstrap'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import Icon from '~components/Icon'
import Brands from '~components/Brands'
import DATA from './constants'
import * as s from './Hero.module.scss'
import heroAnim from './anim'

const Hero = ({ isDesktop, isPreloaded }) => {
  const { title, descr, btnOrder, btnServices } = DATA
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
              {title}
            </h1>
            <p
              className={s.hero_descr}
              data-appear="hero"
              data-direction="bottom"
            >
              {descr}
            </p>
          </div>
          <div className={s.hero_btns} data-appear="hero">
            <Button
              className="btn-icon"
              href="https://blknt.cc/cosmetology"
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="tel" size={20} />
              <span className="btn-icon-text">{btnOrder}</span>
            </Button>
            <Button as={Link} to="/services" variant="secondary">
              {btnServices}
            </Button>
          </div>
          <div className={s.hero_ill} ref={picRef}>
            <StaticImage
              src="./img/hero.jpg"
              alt="Надання послуги"
              quality={100}
              placeholder="none"
              loading="eager"
            />
            <span className={s.hero_ill_line} ref={lineRef} />
          </div>
        </div>
        <Brands isWithTitle />
      </Container>
    </section>
  )
}

export default Hero
