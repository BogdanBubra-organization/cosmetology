/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import DATA from './constants'
import * as s from './About.module.scss'

const About = () => {
  const { title, descr, btn } = DATA

  return (
    <Container as="section" className={s.about}>
      <div className={s.about_media}>
        <StaticImage
          src="./img/about.jpg"
          alt="Косметологічна клініка"
          quality={100}
          width={680}
          placeholder="none"
          className={s.about_pic}
        />
      </div>
      <div className={s.about_content}>
        <h2>{title}</h2>
        <div className={s.about_descr}>
          {descr.map((item, i) => (
            <p key={`p${i}`}>{item}</p>
          ))}
        </div>
        <Button
          className={s.about_btn}
          variant="secondary"
          as={Link}
          to={btn.link}
        >
          {btn.text}
        </Button>
      </div>
    </Container>
  )
}

export default About
