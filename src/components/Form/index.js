/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react'
import { useForm } from '@formspree/react'
import { useLocation } from '@gatsbyjs/reach-router'
import { Button, Form as F } from 'react-bootstrap'
import { DATA } from './constants'

const Form = ({
  setSucceeded,
  withTextarea,
  service,
  expert,
  promo,
  btnText,
}) => {
  const { fields, btn } = DATA

  const [state, handleSubmit] = useForm('mzbooegr')

  const [validated, setValidated] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setValidated(true)

    const form = e.currentTarget
    if (form.checkValidity()) {
      handleSubmit(e)
    }
  }

  useEffect(() => {
    setSucceeded(state.succeeded)
  }, [state.succeeded])

  const formFields = withTextarea
    ? fields
    : fields.filter((field) => field.as !== 'textarea')

  const location = useLocation()

  const [utmData, setUtmData] = useState('')

  useEffect(() => {
    setUtmData(sessionStorage.getItem('utmData') || location.pathname)
  }, [])

  return (
    <F noValidate validated={validated} onSubmit={onSubmit} className="form">
      {formFields.map((field) => (
        <F.Group key={field.label} className="form-group">
          <F.Label className={field.required && 'form-label--required'}>
            {field.label}
          </F.Label>
          <F.Control {...field} />
        </F.Group>
      ))}

      {service && <F.Control type="hidden" name="Service" value={service} />}

      {expert && <F.Control type="hidden" name="Expert" value={expert} />}

      {promo && <F.Control type="hidden" name="Promo" value={promo} />}

      <F.Control type="hidden" name="Url" value={utmData} />

      <div className="form-btn">
        <Button disabled={state.submitting} type="submit">
          {btnText || btn}
        </Button>
      </div>
    </F>
  )
}

export default Form
