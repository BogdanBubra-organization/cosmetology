/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'

import usePosts from '~hooks/usePosts'
import GalleryMedia from '~components/GalleryMedia'
import TabSwitcher from '~components/TabSwitcher'
import Icon from '~components/Icon'
import SwiperButtons from '~components/SwiperButtons'
import Modal from '~components/Modal'
import MediaWrap from '~components/MediaWrap'
import GalleryPlaceholder from '~components/GalleryPlaceholder'

import * as s from './GalleryList.module.scss'

const TAB_KEYS = ['instagram', 'gallery']

const GalleryList = ({ tabs, media, initialTab }) => {
  const [tab, setTab] = useState(initialTab || TAB_KEYS[0])
  const [modal, setModal] = useState({ show: false, active: 0 })
  const { posts, isLoading } = usePosts()

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
      <div className={s.gallerylist}>
        <TabSwitcher
          tabs={tabs}
          tabKeys={TAB_KEYS}
          activeTab={tab}
          action={handleTabChange}
        />
        <div className={s.gallerylist_list}>
          {tab === TAB_KEYS[0] &&
            (isLoading
              ? [...Array(12)].map((_, i) => (
                  <div
                    className="placeholder-glow placeholder-gallery"
                    key={`p${i}`}
                  >
                    <GalleryPlaceholder />
                  </div>
                ))
              : posts.map(({ id, ...post }) => (
                  <GalleryMedia key={id} {...post} />
                )))}

          {tab === TAB_KEYS[1] &&
            media.map((item, i) => (
              <GalleryMedia
                action={(e, id) => {
                  e.preventDefault()
                  handleModalShow(id)
                }}
                key={`p${i}`}
                media={item}
                index={i}
              />
            ))}
        </div>
      </div>

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
          className="swiper--modal swipper--autoheightMobile"
        >
          {media.map((item, i) => (
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

          <SwiperButtons className="swiper-button-sm">
            <Icon name="swiper-arrow-sm" size={20} />
          </SwiperButtons>
        </Swiper>
      </Modal>
    </>
  )
}

export default GalleryList
