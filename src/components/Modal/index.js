import React from 'react'
import { Button, Modal as M } from 'react-bootstrap'
import cn from 'classnames'
import Icon from '~components/Icon'

const Modal = ({ onHide, title, descr, variant, children, ...rest }) => {
  return (
    <M
      onHide={onHide}
      centered
      className={cn({ [`modal--${variant}`]: variant })}
      {...rest}
    >
      {title && (
        <M.Header>
          <M.Title>{title}</M.Title>
          {descr && <p className="modal-descr">{descr}</p>}
        </M.Header>
      )}
      {children && <M.Body>{children}</M.Body>}
      <Button variant="secondary" className="modal-close" onClick={onHide}>
        <Icon name="close" size={20} />
      </Button>
      {variant !== 'swiper' && (
        <div className="modal-lights">
          <span />
        </div>
      )}
    </M>
  )
}

export default Modal
