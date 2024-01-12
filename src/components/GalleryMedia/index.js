import React from 'react'
import { Ratio } from 'react-bootstrap'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import MediaWrap from '~components/MediaWrap'
import * as s from './GalleryMedia.module.scss'

const GalleryMedia = ({
  action,
  index,
  media,
  permalink,
  media_url: pic,
  media_type: type,
  thumbnail_url: thumbnail,
}) => {
  return (
    <Ratio aspectRatio="4x5">
      {permalink ? (
        <a
          href={permalink}
          target="_blank"
          className={s.gallerymedia}
          rel="noreferrer"
        >
          <img
            src={type === 'VIDEO' ? thumbnail : pic}
            alt="Gallery"
            className={s.gallerymedia_pic}
            loading="lazy"
          />
        </a>
      ) : (
        <button
          type="button"
          onClick={(e) => action(e, index)}
          className={s.gallerymedia}
        >
          <MediaWrap media={media}>
            <GatsbyImage
              className={s.gallerymedia_pic}
              image={getImage(media)}
              alt="Gallery"
            />
          </MediaWrap>
        </button>
      )}
    </Ratio>
  )
}

export default GalleryMedia
