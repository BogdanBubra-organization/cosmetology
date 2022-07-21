/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { Button, Container, Nav } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'
import GalleryPhoto from '~components/GalleryPhoto'
import cn from 'classnames'
import Icon from '~components/Icon'
import usePosts from '~hooks/usePosts'
import Modal from '~components/Modal'
import * as s from './Gallery.module.scss'
import { TABS, BUTTONS } from './constants'

const Buttons = ({ children, className }) => {
  return BUTTONS.map((side) => (
    <Button
      key={side}
      variant="secondary"
      aria-label={side}
      className={cn(
        'swiper-button',
        'swiper-button-disabled',
        `swiper-button-${side}`,
        className
      )}
    >
      {children}
    </Button>
  ))
}

const Gallery = () => {
  const [tab, setTab] = useState(TABS[0].key)
  const posts = usePosts(5)

  const [swiperRef, setSwiperRef] = useState(null)

  const [modal, setModal] = useState({ show: false, active: 0 })

  const handleModalShow = (active) => {
    setModal({ show: true, active })
  }

  const handleHideModal = () => {
    setModal({ show: false, active: 0 })
  }

  return (
    <>
      <section className={s.gallery}>
        <Container as="h2">Галерея</Container>
        <div className={s.gallery_wrapper}>
          <Container>
            <Nav variant="gallery">
              {TABS.map(({ key, text }) => (
                <Nav.Item key={key}>
                  <Nav.Link
                    className={cn({
                      active: key === tab,
                    })}
                    as="button"
                    onClick={() => setTab(key)}
                  >
                    <span data-label={text}>{text}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <div className={s.gallery_list}>
              <Swiper
                onSwiper={setSwiperRef}
                slidesPerView="auto"
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                breakpoints={{
                  0: { spaceBetween: 8 },
                  768: { spaceBetween: 16 },
                }}
                modules={[Navigation]}
              >
                {tab === TABS[0].key
                  ? posts.map(({ id, ...post }) => (
                      <SwiperSlide key={id}>
                        <GalleryPhoto {...post} />
                      </SwiperSlide>
                    ))
                  : [...Array(5)].map((_, i) => (
                      <SwiperSlide key={`p${i}`}>
                        <GalleryPhoto
                          action={(e, id) => {
                            e.preventDefault()
                            handleModalShow(id)
                          }}
                          index={i}
                        />
                      </SwiperSlide>
                    ))}

                <Buttons className="btn-round">
                  <Icon name="swiper-arrow" size={24} />
                </Buttons>
              </Swiper>
            </div>
          </Container>
        </div>
        <Button href="/" variant="secondary" className={s.gallery_btn}>
          ПЕРЕГЛЯНУТИ ВСІ ФОТОГРАФІЇ
        </Button>
      </section>

      <Modal show={modal.show} onHide={handleHideModal} variant="swiper">
        <Swiper
          onSlideChange={(swiper) => {
            if (swiper.activeIndex) swiperRef.slideTo(swiper.activeIndex - 1)
          }}
          effect="fade"
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          modules={[Navigation, EffectFade]}
          initialSlide={modal.active}
        >
          {[...Array(5)].map((_, i) => (
            <SwiperSlide key={`p${i}`}>
              <img
                src={`https://picsum.photos/id/102${i}/1024/600`}
                alt="glr"
                className="modal-pic"
              />
            </SwiperSlide>
          ))}

          <Buttons className="swiper-button-sm">
            <Icon name="swiper-arrow-sm" size={20} />
          </Buttons>
        </Swiper>
      </Modal>
    </>
  )
}

export default Gallery
