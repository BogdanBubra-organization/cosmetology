import React from 'react'
import { Button } from 'react-bootstrap'
import Modal from '~components/Modal'
import Icon from '~components/Icon'
import DATA from './constants'
import * as s from './ModalCallback.module.scss'

const ModalCallback = ({ show, onHide }) => {
  const { title, phones } = DATA
  return (
    <Modal show={show} onHide={onHide} title={title}>
      <ul className={s.callback}>
        {phones.map((item) => (
          <li key={item}>
            <Button
              variant="secondary"
              size="lg"
              className="btn-icon btn-icon--big"
              href={`tel:${item.replace(/[^+\d]/g, '')}`}
            >
              <Icon name="tel" size={16} />
              {item}
            </Button>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

export default ModalCallback
