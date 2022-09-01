import React, { useEffect, useRef } from 'react'
import { Button, Container } from 'react-bootstrap'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { StructuredText } from 'react-datocms'
import useMatchMedia from '~hooks/useMatchMedia'
import * as s from './About.module.scss'
import { resetAnim, floatingAnim } from './anim'

const About = (props) => {
  const { heading, descr, linkText, image } = props

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
          <GatsbyImage
            className={s.about_pic}
            image={getImage(image)}
            alt="Косметологічна клініка"
          />
        </div>
      </div>
      <div
        className={s.about_content}
        data-appear="about"
        data-direction="bottom"
      >
        <h2 className={s.about_title}>{heading}</h2>
        <div className={s.about_descr}>
          <StructuredText data={descr?.value} />
        </div>
        <div className={s.about_btn}>
          <Button variant="secondary" as={Link} to="/about">
            {linkText}
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default About
