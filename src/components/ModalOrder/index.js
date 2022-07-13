import React, { useState } from 'react'
import { useForm } from '@formspree/react'
import { Button, Form } from 'react-bootstrap'
import Modal from '~components/Modal'
import { DATA, FEEDBACK } from './constants'

const ModalOrder = ({ show, onHide, variant }) => {
  const [mode, setMode] = useState(variant)

  const { title, descr, fields, btn } = DATA[mode]
  const { finalTitle, finalDescr } = FEEDBACK

  const [state, handleSubmit, reset] = useForm('myForm')

  const [validated, setValidated] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setValidated(true)

    const form = e.currentTarget
    if (form.checkValidity()) {
      handleSubmit(e)
    }
  }

  const handeExited = () => {
    reset()
    setValidated(false)
    if (mode !== variant) {
      setMode(variant)
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      onExited={handeExited}
      title={!state.succeeded ? title : finalTitle}
      descr={!state.succeeded ? descr : finalDescr}
    >
      {!state.succeeded && (
        <>
          <Form
            noValidate
            validated={validated}
            onSubmit={onSubmit}
            className="form"
          >
            {fields.map((field) => (
              <Form.Group key={field.label} className="form-group">
                <Form.Label
                  className={field.required && 'form-label--required'}
                >
                  {field.label}
                </Form.Label>
                <Form.Control {...field} />
              </Form.Group>
            ))}

            <div className="form-btn">
              <Button disabled={state.submitting} type="submit">
                {btn}
              </Button>
            </div>
          </Form>

          {mode === 'signup' && (
            <div className="modal-bottom">
              <Button onClick={() => setMode('ask')} variant="secondary">
                Маєте запитання?
              </Button>
            </div>
          )}
        </>
      )}
    </Modal>
  )
}

export default ModalOrder
