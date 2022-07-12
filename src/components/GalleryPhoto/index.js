import React from 'react'

import * as s from './GalleryPhoto.module.scss'

const GalleryPhoto = ({ action, index, permalink, media_url: pic }) => {
  if (permalink)
    return (
      <a
        href={permalink}
        target="_blank"
        className={s.galleryphoto}
        rel="noreferrer"
      >
        <img src={pic} alt="glr" className={s.galleryphoto_pic} />
      </a>
    )

  return (
    <button type="button" onClick={action} className={s.galleryphoto}>
      <img
        src={`https://picsum.photos/800/430/?${index}`}
        alt="glr"
        className={s.galleryphoto_pic}
      />
    </button>
  )
}

export default GalleryPhoto
