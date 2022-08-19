/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'
import usePosts from '~hooks/usePosts'
import GalleryMedia from '~components/GalleryMedia'
import TabSwitcher from '~components/TabSwitcher'
import Icon from '~components/Icon'
import SwiperButtons from '~components/SwiperButtons'
import Modal from '~components/Modal'
import GalleryPlaceholder from '~components/GalleryPlaceholder'
import TABS from './constants'

import * as s from './GalleryList.module.scss'

const GalleryList = ({ initialTab }) => {
  const [tab, setTab] = useState(initialTab || TABS[0].key)
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
        <TabSwitcher tabs={TABS} activeTab={tab} action={handleTabChange} />
        <div className={s.gallerylist_list}>
          {tab === TABS[0].key &&
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

          {tab === TABS[1].key &&
            [...Array(12)].map((_, i) => (
              <GalleryMedia
                action={(e, id) => {
                  e.preventDefault()
                  handleModalShow(id)
                }}
                key={`p${i}`}
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
          modules={[Navigation, EffectFade]}
          initialSlide={modal.active}
        >
          {[...Array(12)].map((_, i) => (
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

export default GalleryList
