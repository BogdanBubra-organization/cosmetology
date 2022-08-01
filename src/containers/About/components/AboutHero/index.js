import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container } from 'react-bootstrap'
import Social from '~components/Social'

import * as s from './AboutHero.module.scss'
import DATA from './constants'

const AboutHero = () => {
  return (
    <Container as="section" className={s.abouthero}>
      <h1
        className={s.abouthero_title}
        dangerouslySetInnerHTML={{ __html: DATA.title }}
      />
      <div className={s.abouthero_infoContainer}>
        <div className={s.abouthero_ill}>
          <StaticImage
            src="./img/illustration.png"
            alt="Косметологічна клініка"
            quality={100}
            width={484}
            placeholder="none"
          />
        </div>
        <div className={s.abouthero_content}>
          <h3 dangerouslySetInnerHTML={{ __html: DATA.content.title }} />
          <p className={s.abouthero_descr}>{DATA.content.descr}</p>
          <Social variant="about" />
        </div>
      </div>
    </Container>
  )
}

export default AboutHero
