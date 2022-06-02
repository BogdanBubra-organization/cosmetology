import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import cn from 'classnames'
import * as s from './Pics.module.scss'

const Pics = () => {
  return (
    <>
      <StaticImage
        className={cn(s.pic, s.top, 'animatePic')}
        src="./img/pic1.png"
        alt="Room"
        placeholder="none"
        width={328}
        style={{ position: 'absolute' }}
      />
      <StaticImage
        className={cn(s.pic, s.bottom, 'animatePic')}
        src="./img/pic2.png"
        alt="Room"
        placeholder="none"
        width={318}
        style={{ position: 'absolute' }}
      />
    </>
  )
}

export default Pics
