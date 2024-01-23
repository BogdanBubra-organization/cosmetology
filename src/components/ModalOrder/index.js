/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react'
import { useForm } from '@formspree/react'
import { useLocation } from '@gatsbyjs/reach-router'
import { Button, Form } from 'react-bootstrap'
import Modal from '~components/Modal'
import { DATA, FEEDBACK } from './constants'

const ModalOrder = ({ show, onHide, service, expert }) => {
  const { title, titleService, descr, fields, btn } = DATA
  const { finalTitle, finalDescr } = FEEDBACK

  const [state, handleSubmit, reset] = useForm('mzbooegr')

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
  }

  const formHeader = service || expert ? titleService : title
  const formFields =
    service || expert
      ? fields.filter((field) => field.as !== 'textarea')
      : fields

  const location = useLocation()

  const [utmData, setUtmData] = useState(null)

  useEffect(() => {
    setUtmData(sessionStorage.getItem('utmData') || location.pathname)
  }, [])

  return (
    <Modal
      show={show}
      onHide={onHide}
      onExited={handeExited}
      title={!state.succeeded ? formHeader : finalTitle}
      descr={!state.succeeded ? descr : finalDescr}
      isSucceeded={state.succeeded}
      isService={!!service}
    >
      {!state.succeeded && (
        <Form
          noValidate
          validated={validated}
          onSubmit={onSubmit}
          className="form"
        >
          {formFields.map((field) => (
            <Form.Group key={field.label} className="form-group">
              <Form.Label className={field.required && 'form-label--required'}>
                {field.label}
              </Form.Label>
              <Form.Control {...field} />
            </Form.Group>
          ))}

          {service && (
            <>
              <Form.Control type="hidden" name="Service" value={service} />
              <Form.Control type="hidden" name="Url" value={utmData} />
            </>
          )}

          {expert && (
            <Form.Control type="hidden" name="Expert" value={expert} />
          )}

          <div className="form-btn">
            <Button disabled={state.submitting} type="submit">
              {btn}
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  )
}

export default ModalOrder
