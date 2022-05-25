import React from 'react'
import { Button, Modal as M } from 'react-bootstrap'
import Icon from '~components/Icon'

const Modal = ({ show, onHide, onExited, title, descr, children }) => {
  return (
    <M onExited={onExited} show={show} onHide={onHide} centered>
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
      <div className="modal-lights">
        <span />
      </div>
    </M>
  )
}

export default Modal
