import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import cn from 'classnames'

import * as s from './Pics.module.scss'

const Pics = ({ leftImage, rightImage }) => (
  <div className={s.pics}>
    <GatsbyImage
      className={cn(s.pic, s.left, 'animatePic')}
      image={getImage(leftImage)}
      style={{ position: 'absolute' }}
      alt="Room"
    />
    <GatsbyImage
      className={cn(s.pic, s.right, 'animatePic')}
      image={getImage(rightImage)}
      alt="Room"
      style={{ position: 'absolute' }}
    />
  </div>
)

export default Pics
