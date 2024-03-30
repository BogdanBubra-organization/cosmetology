/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import cn from 'classnames'
import { StructuredText } from 'react-datocms'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Modal from '~components/Modal'
import Form from '~components/Form'
import { DATA, FEEDBACK } from './constants'
import * as s from './ModalOrder.module.scss'

const { header, description } = DATA

const ModalOrder = ({
  show,
  onHide,
  title = header,
  descr = description,
  btnText,
  picture,
  isPromo,
  withTextarea,
  service,
  expert,
}) => {
  const { finalTitle, finalDescr } = FEEDBACK

  const [succeeded, setSucceeded] = useState(false)

  const handleClose = () => {
    onHide()
    setTimeout(() => {
      setSucceeded(false)
    }, 150)
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      title={!succeeded ? title : finalTitle}
      descr={!succeeded ? (isPromo ? null : descr) : finalDescr}
      isSucceeded={succeeded}
      isService={!!service}
      isPromo={isPromo}
    >
      {!succeeded &&
        (isPromo ? (
          <div className={cn(s.promo, { [s.wide]: picture })}>
            {picture && (
              <GatsbyImage
                image={getImage(picture)}
                alt={title}
                className={s.promo_pic}
              />
            )}

            <div className={s.promo_content}>
              {descr && (
                <div className={s.promo_descr}>
                  <StructuredText data={descr.value} />
                </div>
              )}

              <Form
                setSucceeded={setSucceeded}
                btnText={btnText}
                promo={title}
              />
            </div>
          </div>
        ) : (
          <Form
            setSucceeded={setSucceeded}
            btnText={btnText}
            withTextarea={withTextarea}
            service={service}
            expert={expert}
          />
        ))}
    </Modal>
  )
}

export default ModalOrder
