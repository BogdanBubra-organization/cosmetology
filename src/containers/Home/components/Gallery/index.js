/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'
import cn from 'classnames'
import GalleryPhoto from '~components/GalleryPhoto'
import Icon from '~components/Icon'
import Modal from '~components/Modal'
import TabSwitcher from '~components/TabSwitcher'
import SwiperButtons from '~components/SwiperButtons'
import { Link } from 'gatsby'
import GalleryPlaceholder from '~components/GalleryPlaceholder'
import * as s from './Gallery.module.scss'
import TABS from './constants'

const Gallery = ({ posts, isLoading }) => {
  const [tab, setTab] = useState(TABS[0].key)

  const [modal, setModal] = useState({ show: false, active: 0 })

  const handleModalShow = (active) => {
    setModal({ show: true, active })
  }

  const handleHideModal = () => {
    setModal({ show: false, active: 0 })
  }

  const handleTabChange = (key) => {
    setTab(key)
  }

  return (
    <>
      <section id="gallery" className={s.gallery}>
        <Container>
          <h2 data-appear="gallery" data-direction="top">
            Галерея
          </h2>
          <TabSwitcher tabs={TABS} activeTab={tab} action={handleTabChange} />
        </Container>

        <div className={s.gallery_wrapper}>
          <Container className={s.gallery_mask}>
            <Swiper
              className="swiper--gallery"
              slidesPerView={1}
              spaceBetween={8}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { spaceBetween: 16, slidesPerView: 2 },
                1200: { spaceBetween: 16, slidesPerView: 3 },
              }}
              modules={[Navigation]}
              id="gallery-swiper"
              data-array="gallery"
              data-direction="bottom"
            >
              {tab === TABS[0].key &&
                (isLoading
                  ? [...Array(3)].map((_, i) => (
                      <SwiperSlide
                        className={cn(
                          'placeholder-glow',
                          'placeholder-gallery',
                          s.gallery_placeholder
                        )}
                        key={`p${i}`}
                      >
                        <GalleryPlaceholder />
                      </SwiperSlide>
                    ))
                  : posts.map(({ id, ...post }) => (
                      <SwiperSlide key={id}>
                        <GalleryPhoto {...post} />
                      </SwiperSlide>
                    )))}

              {tab === TABS[1].key &&
                [...Array(5)].map((_, i) => (
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

              <SwiperButtons className="btn-round">
                <Icon name="swiper-arrow" size={24} />
              </SwiperButtons>
            </Swiper>
          </Container>
        </div>

        <Container
          className={s.gallery_btn}
          data-appear="gallery"
          data-direction="bottom"
        >
          <Button as={Link} to="/gallery" state={{ tab }} variant="secondary">
            ПЕРЕГЛЯНУТИ ВСІ ФОТОГРАФІЇ
          </Button>
        </Container>
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
                src={`https://picsum.photos/id/2${i}/1024/600`}
                alt="glr"
                className="modal-pic"
              />
            </SwiperSlide>
          ))}

          <SwiperButtons className="swiper-button-sm">
            <Icon name="swiper-arrow-sm" size={20} />
          </SwiperButtons>
        </Swiper>
      </Modal>
    </>
  )
}

export default Gallery
