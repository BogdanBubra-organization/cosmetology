import React, { useState } from 'react'
import { useForm } from '@formspree/react'
import { Button, Form } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import Modal from '~components/Modal'
import DATA from './constants'

const ModalOrder = ({ show, onHide }) => {
  const { title, descr, fields, btn, finalTitle, finalDescr } = DATA

  const [state, handleSubmit, reset] = useForm('mrgrdbyv')
  const [validated, setValidated] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setValidated(true)

    const form = e.currentTarget
    if (form.checkValidity()) {
      handleSubmit(e).then(() => {
        setValidated(false)
        e.target.reset()
      })
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      onExited={() => {
        reset()
      }}
      title={!state.succeeded ? title : finalTitle}
      descr={!state.succeeded ? descr : finalDescr}
    >
      {!state.succeeded && (
        <Form
          noValidate
          validated={validated}
          onSubmit={onSubmit}
          className="form"
        >
          {fields.map(
            ({ name, type, label, placeholder, mask, isRequired }) => (
              <Form.Group key={label} className="form-group">
                <Form.Label className={isRequired && 'form-label--required'}>
                  {label}
                </Form.Label>
                <Form.Control
                  as={type === 'textarea' ? type : InputMask}
                  type={!type === 'textarea' ? null : type}
                  name={name}
                  placeholder={placeholder}
                  mask={mask}
                  pattern={
                    type === 'tel'
                      ? '^\\+\\d{2} \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$'
                      : null
                  }
                  required={isRequired}
                />
              </Form.Group>
            )
          )}
          <Button
            className="form-btn"
            disabled={state.submitting}
            type="submit"
          >
            {btn}
          </Button>
        </Form>
      )}
    </Modal>
  )
}

export default ModalOrder
