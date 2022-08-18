import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { StructuredText } from 'react-datocms'
import { Container } from 'react-bootstrap'

import * as s from './Founder.module.scss'

const Founder = ({ avatar, title, subtitle, descr }) => (
  <Container as="section" className={s.founder}>
    <div className={s.founder_infoContainer}>
      <div className={s.founder_content}>
        <div className={s.founder_title}>
          <StructuredText data={title.value} />
        </div>
        <div className={s.founder_position}>
          <StructuredText data={subtitle.value} />
        </div>
        <div className={s.founder_textWrapper}>
          <StructuredText data={descr.value} />
        </div>
      </div>

      <div className={s.founder_ill}>
        <GatsbyImage
          className={s.founder_pic}
          image={getImage(avatar)}
          alt="Світлана Ціховська"
        />
      </div>
    </div>
  </Container>
)

export default Founder
