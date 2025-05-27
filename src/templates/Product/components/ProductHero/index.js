/* eslint-disable no-nested-ternary */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { StructuredText } from 'react-datocms'
import { Button } from 'react-bootstrap'
import cn from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'

import MediaWrap from '~components/MediaWrap'
import SwiperButtons from '~components/SwiperButtons'

import Icon from '~components/Icon'
import { formatPrice } from './utils'
import * as s from './ProductHero.module.scss'

const ModalOrder = React.lazy(() =>
  import(/* webpackChunkName: "modal-order" */ '~components/ModalOrder')
)

const Btns = ({ handleShowOrder, instagramLink, className }) => (
  <div className={cn(s.producthero_btns, className)}>
    <Button onClick={handleShowOrder}>Записатись на процедуру</Button>

    {/* <Button
      variant="outline"
      href="https://cbox.mobi/go/cosmetology-ua"
      target="_blank"
      rel="noreferrer"
    >
      Обрати спеціаліста та час
    </Button> */}

    {instagramLink && (
      <Button
        variant="secondary"
        href={instagramLink}
        target="_blank"
        rel="noreferrer"
        className={cn('btn-icon', s.producthero_insta)}
      >
        <Icon name="instagram" size={20} />
        Більше наших робіт
      </Button>
    )}
  </div>
)

const ProductHero = ({
  name,
  media,
  descr,
  price,
  priceFrom,
  priceTo,
  imageTitle,
  descrTitle,
  previewImage,
  instagramLink,
  warningSection,
}) => {
  const [showOrder, setShowOrder] = useState(false)
  const handleShowOrder = () => setShowOrder(true)

  const showAnyPrice = price || priceTo || priceFrom
  const showExactPrice = !priceTo && !priceFrom

  const { title: warningTitle, warningList } = warningSection[0] || {}

  const isWarningList = !!warningList?.filter((item) => !!item.name).length
  const isWarningSection = !!warningTitle || isWarningList

  return (
    <section className={s.producthero}>
      <div className={s.producthero_ill_wrapper}>
        <div className={s.producthero_ill}>
          {media.length ? (
            <>
              <h5 className={s.producthero_title}>{imageTitle}</h5>
              {media.length > 1 ? (
                <Swiper
                  spaceBetween={16}
                  modules={[Navigation, EffectFade]}
                  navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }}
                  effect="fade"
                  autoHeight
                  className={s.producthero_slider}
                >
                  {media.map((item, i) => (
                    <SwiperSlide key={`m${i}`} className={s.producthero_slide}>
                      <MediaWrap media={item} isProduct>
                        <GatsbyImage
                          className={s.producthero_pic}
                          image={getImage(item)}
                          alt={name}
                          objectFit="contain"
                        />
                      </MediaWrap>
                    </SwiperSlide>
                  ))}

                  <SwiperButtons className="btn-round">
                    <Icon name="swiper-arrow" size={24} />
                  </SwiperButtons>
                </Swiper>
              ) : (
                <MediaWrap media={media[0]} isProduct>
                  <GatsbyImage
                    className={s.producthero_pic}
                    image={getImage(media[0])}
                    alt={name}
                    objectFit="contain"
                  />
                </MediaWrap>
              )}
            </>
          ) : (
            <img src={previewImage?.url} alt={name} />
          )}
        </div>
      </div>

      <div className={s.producthero_content}>
        <h3 className="h5">{descrTitle}</h3>

        <Btns
          handleShowOrder={handleShowOrder}
          className={s.producthero_topBtns}
        />

        <StructuredText data={descr?.value} />

        {isWarningSection && (
          <div className={s.producthero_warning}>
            {!!warningTitle && (
              <span className={s.producthero_warning_title}>
                {warningTitle}
              </span>
            )}

            {isWarningList && (
              <ul className={s.producthero_warning_list}>
                {warningList.map(
                  (item, i) => item.name && <li key={`w${i}`}>{item.name}</li>
                )}
              </ul>
            )}
          </div>
        )}

        {!!showAnyPrice && (
          <div className={s.producthero_price}>
            <h3 className="h5">Вартість</h3>
            <span className={cn('h2', s.price)}>
              {!!priceFrom && `від ${formatPrice(priceFrom)}`}{' '}
              {!!priceTo && `до ${formatPrice(priceTo)}`}
              {showExactPrice && formatPrice(price)} грн
            </span>
          </div>
        )}

        <Btns handleShowOrder={handleShowOrder} instagramLink={instagramLink} />
      </div>
      <ModalOrder
        show={showOrder}
        onHide={() => setShowOrder(false)}
        service={name}
        fieldsSet="order"
      />
    </section>
  )
}

export default ProductHero
