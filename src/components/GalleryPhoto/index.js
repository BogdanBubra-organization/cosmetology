import React from 'react'

import * as s from './GalleryPhoto.module.scss'

const GalleryPhoto = ({
  action,
  index,
  permalink,
  media_url: pic,
  media_type: type,
  thumbnail_url: thumbnail,
}) => {
  return permalink ? (
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
  ) : (
    <button
      type="button"
      onClick={(e) => action(e, index)}
      className={s.galleryphoto}
    >
      <img
        src={`https://picsum.photos/id/2${index}/800/430`}
        alt="Gallery"
        className={s.galleryphoto_pic}
      />
    </button>
  )
}

export default GalleryPhoto
