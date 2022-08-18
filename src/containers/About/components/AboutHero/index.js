import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { StructuredText } from 'react-datocms'
import { Container } from 'react-bootstrap'

import Social from '~components/Social'
import * as s from './AboutHero.module.scss'

const AboutHero = ({ heading, title, descr, image, socials }) => (
  <Container as="section" className={s.abouthero}>
    <div className={s.abouthero_title}>
      <StructuredText data={heading.value} />
    </div>

    <div className={s.abouthero_infoContainer}>
      <div className={s.abouthero_ill}>
        <GatsbyImage image={getImage(image)} alt="Косметологічна клініка" />
      </div>

      <div className={s.abouthero_content}>
        <div className={s.abouthero_subtitle}>
          <StructuredText data={title.value} />
        </div>

        <p className={s.abouthero_descr}>{descr}</p>
        <Social data={socials} variant="about" isBtn isWithText />
      </div>
    </div>
  </Container>
)

export default AboutHero
