/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper'
import cn from 'classnames'

import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import SwiperButtons from '~components/SwiperButtons'
import Icon from '~components/Icon'

import * as s from './Events.module.scss'

const ModalOrder = React.lazy(() =>
  import(/* webpackChunkName: "modal-order" */ '~components/ModalOrder')
)

const Events = ({ title, pictures, btnOrder }) => {
  const [showOrder, setShowOrder] = useState(false)
  const handleShowOrder = () => setShowOrder(true)
  return (
    <Layout>
      <S title="Акції" />
      <Container as="section" className={s.events}>
        <h1 className={s.events_title}>{title}</h1>
        {pictures.length &&
          (pictures.length > 1 ? (
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              modules={[Autoplay, Navigation]}
              rewind
              autoplay={{ delay: 5000 }}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              autoHeight
              breakpoints={{
                1200: { slidesPerView: 2 },
              }}
              className={s.events_slider}
            >
              {pictures.map((item, i) => (
                <SwiperSlide key={`m${i}`} className={s.events_slide}>
                  <GatsbyImage
                    className={s.events_pic}
                    image={getImage(item)}
                    alt={item.alt || item.basename}
                    objectFit="contain"
                  />
                </SwiperSlide>
              ))}

              <SwiperButtons className="btn-round">
                <Icon name="swiper-arrow" size={24} />
              </SwiperButtons>
            </Swiper>
          ) : (
            <GatsbyImage
              className={s.events_pic}
              image={getImage(pictures[0])}
              alt={pictures[0].alt || pictures[0].basename}
              objectFit="contain"
            />
          ))}
        <Button
          onClick={handleShowOrder}
          className={cn('btn-icon', s.events_btn)}
        >
          <Icon name="tel" size={20} />
          <span className="btn-icon-text">{btnOrder}</span>
        </Button>
      </Container>
      <Lights />

      <ModalOrder
        show={showOrder}
        onHide={() => setShowOrder(false)}
        fieldsSet="order"
      />
    </Layout>
  )
}

export default Events
