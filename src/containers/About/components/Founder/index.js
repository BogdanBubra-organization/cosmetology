/* eslint-disable react/no-array-index-key */
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { Container } from 'react-bootstrap'
import DATA from './constants'

import * as s from './Founder.module.scss'

const Founder = () => {
  return (
    <Container className={s.founder}>
      <div className={s.founder_infoContainer}>
        <div className={s.founder_content}>
          <h3 dangerouslySetInnerHTML={{ __html: DATA.name }} />
          <p className={s.founder_position}>
            {DATA.position.map((el, i) => (
              <span key={`s${i}`}>{el}</span>
            ))}
          </p>
          <div className={s.founder_textWrapper}>
            {DATA.descr.map((el, i) => (
              <p className={s.founder_descr} key={`p${i}`}>
                {el}
              </p>
            ))}
          </div>
        </div>
        <div className={s.founder_ill}>
          <StaticImage
            src="./img/founder.png"
            alt="Світлана Ціховська"
            quality={100}
            width={332}
            placeholder="none"
            className={s.founder_pic}
          />
        </div>
      </div>
    </Container>
  )
}

export default Founder
