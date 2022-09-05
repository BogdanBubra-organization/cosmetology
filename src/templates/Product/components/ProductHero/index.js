import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { StructuredText } from 'react-datocms'
import { Button, Ratio } from 'react-bootstrap'

import MediaWrap from '~components/MediaWrap'
import * as s from './ProductHero.module.scss'

const ProductHero = ({
  name,
  example,
  descr,
  imageTitle,
  descrTitle,
  previewImage,
}) => (
  <section className={s.producthero}>
    <div className={s.producthero_ill}>
      <h5>{imageTitle}</h5>
      {example ? (
        <Ratio aspectRatio={15 / 17}>
          <MediaWrap media={example}>
            <GatsbyImage
              className={s.producthero_pic}
              image={getImage(example)}
              alt={name}
            />
          </MediaWrap>
        </Ratio>
      ) : (
        <img src={previewImage?.url} alt={name} />
      )}
    </div>

    <div className={s.producthero_content}>
      <h3 className="h5">{descrTitle}</h3>
      <StructuredText data={descr?.value} />

      <div className={s.producthero_btn}>
        <Button
          href="https://cbox.mobi/go/cosmetology-ua"
          target="_blank"
          rel="noreferrer"
        >
          Записатись на процедуру
        </Button>
      </div>
    </div>
  </section>
)

export default ProductHero
