import React from 'react'
import { Ratio } from 'react-bootstrap'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import * as s from './GalleryPhoto.module.scss'

const GalleryPhoto = ({
  action,
  index,
  image,
  permalink,
  media_url: pic,
  media_type: type,
  thumbnail_url: thumbnail,
}) => {
  return permalink ? (
    <Ratio aspectRatio="4x5">
      <a
        href={permalink}
        target="_blank"
        className={s.galleryphoto}
        rel="noreferrer"
      >
        <img
          src={type === 'VIDEO' ? thumbnail : pic}
          alt="Gallery"
          className={s.galleryphoto_pic}
        />
      </a>
    </Ratio>
  ) : (
    <Ratio aspectRatio="4x5">
      <button
        type="button"
        onClick={(e) => action(e, index)}
        className={s.galleryphoto}
      >
        <GatsbyImage
          className={s.galleryphoto_pic}
          image={getImage(image)}
          alt="Gallery"
        />
      </button>
    </Ratio>
  )
}

export default GalleryPhoto
