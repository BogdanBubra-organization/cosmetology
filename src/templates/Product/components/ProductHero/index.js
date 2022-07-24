import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import getImgWithBlurHash from '~utils/getImgWithBlurHash'
import { Button } from 'react-bootstrap'

import ModalOrder from '~components/ModalOrder'
import BulletedList from '~components/BulletedList'
import * as s from './ProductHero.module.scss'

const ProductHero = ({ name, info }) => {
  const [showOrder, setShowOrder] = useState(false)

  const { workPic, descr, list } = info

  return (
    <>
      <section className={s.producthero}>
        <div className={s.producthero_ill}>
          <h5>Приклад роботи</h5>
          <GatsbyImage
            className={s.producthero_pic}
            image={getImgWithBlurHash(workPic)}
            alt={name}
          />
        </div>
        <div className={s.producthero_content}>
          <h3 className="h5">Про процедуру</h3>
          <div className={s.producthero_descr}>
            {descr.map((el, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={`p${i}`}>{el}</p>
            ))}
          </div>

          {list?.length && (
            <BulletedList list={list} className={s.producthero_list} />
          )}

          <div className={s.producthero_btn}>
            <Button onClick={() => setShowOrder(true)}>
              Записатись на процедуру
            </Button>
          </div>
        </div>
      </section>

      <ModalOrder
        variant="signup"
        show={showOrder}
        onHide={() => setShowOrder(false)}
      />
    </>
  )
}

export default ProductHero
