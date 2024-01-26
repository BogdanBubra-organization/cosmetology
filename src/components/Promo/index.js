import React, { useState } from 'react'

const ModalOrder = React.lazy(() =>
  import(/* webpackChunkName: "modal-order" */ '~components/ModalOrder')
)

const Promo = ({ title, description, picture, button, meta }) => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const isWatched =
    typeof window !== 'undefined' &&
    localStorage.getItem('promoId') === meta.updatedAt

  if (!isWatched) {
    setTimeout(() => {
      handleShow()
      localStorage.setItem('promoId', meta.updatedAt)
    }, 120000)
  }

  return (
    <ModalOrder
      show={show}
      onHide={() => handleClose(false)}
      title={title}
      descr={description}
      picture={picture}
      btnText={button}
      isPromo={picture ? 'wide' : true}
    />
  )
}

export default Promo
