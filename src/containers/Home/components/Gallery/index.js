/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'
import cn from 'classnames'

import GalleryMedia from '~components/GalleryMedia'
import Icon from '~components/Icon'
import Modal from '~components/Modal'
import TabSwitcher from '~components/TabSwitcher'
import SwiperButtons from '~components/SwiperButtons'
import MediaWrap from '~components/MediaWrap'
import GalleryPlaceholder from '~components/GalleryPlaceholder'

import * as s from './Gallery.module.scss'

const TAB_KEYS = ['instagram', 'gallery']

const Gallery = ({
  heading,
  instagramTab,
  resultsTab,
  linkText,
  media: suppliedMedia,
  posts,
  isLoading,
}) => {
  const media = (suppliedMedia || []).filter((item) =>
    item?.video ? Boolean(item.url) : Boolean(getImage(item))
  )
  const [tab, setTab] = useState(TAB_KEYS[0])
  const [modal, setModal] = useState({ show: false, active: 0 })

  const tabs = [instagramTab, resultsTab]

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
            {heading}
          </h2>
          <TabSwitcher
            tabs={media.length ? tabs : tabs.slice(0, 1)}
            tabKeys={media.length ? TAB_KEYS : TAB_KEYS.slice(0, 1)}
            activeTab={tab}
            action={handleTabChange}
          />
        </Container>

        <div className={s.gallery_wrapper}>
          <Container className={s.gallery_mask}>
            <Swiper
              className="swiper--gallery swipper--autoheightMobile"
              autoHeight
              slidesPerView={1}
              spaceBetween={8}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              breakpoints={{
                768: { spaceBetween: 16, slidesPerView: 2 },
                1200: { spaceBetween: 16, slidesPerView: 3 },
              }}
              modules={[Navigation]}
              id="gallery-swiper"
              data-array="gallery"
              data-direction="bottom"
            >
              {tab === TAB_KEYS[0] &&
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
                        <GalleryMedia {...post} />
                      </SwiperSlide>
                    )))}

              {tab === TAB_KEYS[1] &&
                media?.map((item, i) => (
                  <SwiperSlide key={`p${i}`}>
                    <GalleryMedia
                      action={(e, id) => {
                        e.preventDefault()
                        handleModalShow(id)
                      }}
                      media={item}
                      index={i}
                    />
                  </SwiperSlide>
                ))}

              {(tab === TAB_KEYS[0]
                ? isLoading || posts.length > 1
                : media.length > 1) && (
                <SwiperButtons className="btn-round">
                  <Icon name="swiper-arrow" size={24} />
                </SwiperButtons>
              )}
            </Swiper>
          </Container>
        </div>

        <Container
          className={s.gallery_btn}
          data-appear="gallery"
          data-direction="bottom"
        >
          <Button as={Link} to="/gallery" state={{ tab }} variant="secondary">
            {linkText}
          </Button>
        </Container>
      </section>

      {media.length > 0 && (
        <Modal show={modal.show} onHide={handleHideModal} variant="swiper">
          <Swiper
            effect="fade"
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            autoHeight
            modules={[Navigation, EffectFade]}
            initialSlide={modal.active}
            className="swiper--modal"
          >
            {media?.map((item, i) => (
              <SwiperSlide key={`p${i}`}>
                <MediaWrap media={item}>
                  <GatsbyImage
                    className="modal-pic"
                    image={getImage(item)}
                    alt="Gallery"
                  />
                </MediaWrap>
              </SwiperSlide>
            ))}

            {media.length > 1 && (
              <SwiperButtons className="swiper-button-sm">
                <Icon name="swiper-arrow-sm" size={20} />
              </SwiperButtons>
            )}
          </Swiper>
        </Modal>
      )}
    </>
  )
}

export default Gallery
