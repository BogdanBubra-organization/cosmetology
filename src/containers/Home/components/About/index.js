/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef } from 'react'
import { Button, Container } from 'react-bootstrap'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import useMatchMedia from '~hooks/useMatchMedia'
import DATA from './constants'
import * as s from './About.module.scss'
import { resetAnim, floatingAnim } from './anim'

const About = () => {
  const { title, descr, btn } = DATA
  const picRef = useRef(null)
  const isDesktop = useMatchMedia('(min-width: 1200px)')

  useEffect(() => {
    if (isDesktop) floatingAnim(picRef.current)

    return () => resetAnim(picRef.current)
  }, [isDesktop, picRef])

  return (
    <Container as="section" id="about" className={s.about}>
      <div
        className={s.about_media}
        data-appear="about"
        data-direction="bottom"
      >
        <div className={s.about_pic_wrapper} ref={picRef}>
          <StaticImage
            src="./img/about.jpg"
            alt="Косметологічна клініка"
            quality={100}
            width={680}
            placeholder="none"
            className={s.about_pic}
          />
        </div>
      </div>
      <div
        className={s.about_content}
        data-appear="about"
        data-direction="bottom"
      >
        <h2 className={s.about_title}>{title}</h2>
        <div className={s.about_descr}>
          {descr.map((item, i) => (
            <p key={`p${i}`}>{item}</p>
          ))}
        </div>
        <div className={s.about_btn}>
          <Button variant="secondary" as={Link} to={btn.link}>
            {btn.text}
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default About
