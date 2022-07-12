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
      className={`swiper-button swiper-button-${side} ${className}`}
    >
      {children}
    </Button>
  ))
}

const Gallery = () => {
  const [tab, setTab] = useState(TABS[0].name)
  const posts = usePosts(5)

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
        <div className={s.gallery_list_wrapper}>
          <Container>
            <Nav variant="gallery">
              {TABS.map(({ name, text }) => (
                <Nav.Item key={name}>
                  <Nav.Link
                    className={cn({
                      active: name === tab,
                    })}
                    as="button"
                    onClick={() => setTab(name)}
                  >
                    <span data-label={text}>{text}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <div className={s.gallery_list}>
              <Swiper
                slidesPerView="auto"
                navigation={{
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }}
                breakpoints={{
                  576: { spaceBetween: 8 },
                  768: { spaceBetween: 16 },
                }}
                modules={[Navigation]}
              >
                {tab === TABS[0].name
                  ? posts.map(({ id, ...post }) => (
                      <SwiperSlide key={id}>
                        <GalleryPhoto {...post} />
                      </SwiperSlide>
                    ))
                  : [...Array(5)].map((_, i) => (
                      <SwiperSlide key={`p${i}`}>
                        <GalleryPhoto
                          action={(e) => {
                            e.preventDefault()
                            handleModalShow(i)
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

        <Button href="/" variant="secondary">
          ПЕРЕГЛЯНУТИ ВСІ ФОТОГРАФІЇ
        </Button>
      </section>

      <Modal show={modal.show} onHide={handleHideModal} variant="swiper">
        <Swiper
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
                src={`https://picsum.photos/1024/600/?${i}`}
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
