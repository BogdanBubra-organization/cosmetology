import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import getImgWithBlurHash from '~utils/getImgWithBlurHash'
import { Button, Ratio } from 'react-bootstrap'

import BulletedList from '~components/BulletedList'
import * as s from './ProductHero.module.scss'

const ProductHero = ({ name, info }) => {
  const { workPic, descr } = info

  return (
    <section className={s.producthero}>
      <div className={s.producthero_ill}>
        <h5>Приклад роботи</h5>
        <Ratio aspectRatio={15 / 17}>
          <GatsbyImage
            className={s.producthero_pic}
            image={getImgWithBlurHash(workPic)}
            alt={name}
          />
        </Ratio>
      </div>
      <div className={s.producthero_content}>
        <h3 className="h5">Про процедуру</h3>
        {descr.map(({ type, data }) => {
          switch (type) {
            case 'text':
              return (
                <div className={s.producthero_descr}>
                  {data.map((el, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <p key={`p${i}`}>{el}</p>
                  ))}
                </div>
              )
            case 'list':
              return (
                <BulletedList
                  list={data}
                  className={s.producthero_list}
                  withPunctuation
                />
              )
            default:
              return null
          }
        })}

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
}

export default ProductHero
