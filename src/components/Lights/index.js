import React from 'react'

import * as s from './Lights.module.scss'

const Lights = ({ variant }) => {
  return (
    <div className={s.lightsWrap}>
      <div className={s.lights}>
        <span />
      </div>
      {variant === 'about' && <span className={s.bottomLights} />}
    </div>
  )
}

export default Lights
