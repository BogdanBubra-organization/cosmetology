/* eslint-disable no-nested-ternary */
import React from 'react'
import { Button, Modal as M } from 'react-bootstrap'
import { StructuredText } from 'react-datocms'
import cn from 'classnames'
import Icon from '~components/Icon'

const Modal = ({
  onHide,
  title,
  descr,
  variant,
  isSucceeded,
  isService,
  isPromo,
  children,
  ...rest
}) => {
  const classSuccess =
    isSucceeded && `modal-title-success${isService ? '-service' : ''}`

  return (
    <M
      onHide={onHide}
      centered
      className={cn(
        { [`modal--${variant}`]: variant },
        { 'modal--event': isPromo === 'wide' && !isSucceeded }
      )}
      {...rest}
    >
      {title && (
        <M.Header>
          <M.Title
            className={cn(classSuccess, {
              'modal-title--event': isPromo && !isSucceeded,
            })}
          >
            {title}
          </M.Title>
          {descr &&
            (descr.value ? (
              <div className="modal-descr">
                <StructuredText data={descr.value} />
              </div>
            ) : (
              <p className="modal-descr">{descr}</p>
            ))}
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
