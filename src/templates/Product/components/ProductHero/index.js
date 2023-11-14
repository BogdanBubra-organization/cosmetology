/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { StructuredText } from 'react-datocms'
import { Button, Ratio } from 'react-bootstrap'
import cn from 'classnames'

import MediaWrap from '~components/MediaWrap'

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
  example,
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
          {example ? (
            <>
              <h5>{imageTitle}</h5>
              <Ratio aspectRatio={15 / 17}>
                <MediaWrap media={example}>
                  <GatsbyImage
                    className={s.producthero_pic}
                    image={getImage(example)}
                    alt={name}
                  />
                </MediaWrap>
              </Ratio>
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
      />
    </section>
  )
}

export default ProductHero
