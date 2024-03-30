/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
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

  const formRef = useRef(null)

  const {
    register,
    formState: { isSubmitted, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm({ defaultValues: { 'fields[38995_1][60361]': '' } })

  const onValidSubmit = () => {
    try {
      const newData = new FormData(formRef.current)
      fetch('https://forms.kommo.com/queue/add/', {
        method: 'POST',
        body: newData,
      })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    setSucceeded(isSubmitSuccessful)
  }, [isSubmitSuccessful])

  const formFields = withTextarea
    ? fields
    : fields.filter((field) => field.as !== 'textarea')

  const location = useLocation()

  const [utmData, setUtmData] = useState('')

  useEffect(() => {
    setUtmData(sessionStorage.getItem('utmData') || location.pathname)
  }, [])

  const theme = service || expert || promo || ''

  return (
    <F
      ref={formRef}
      noValidate
      validated={isSubmitted}
      onSubmit={handleSubmit(onValidSubmit)}
      className="form"
    >
      {formFields.map(({ label, name, pattern, required, ...rest }) => (
        <F.Group key={label} className="form-group">
          <F.Label className={required && 'form-label--required'}>
            {label}
          </F.Label>

          <F.Control
            {...register(name, {
              required,
              pattern: pattern && {
                value: new RegExp(pattern),
              },
            })}
            pattern={pattern}
            autoComplete="off"
            required={required}
            {...rest}
          />
        </F.Group>
      ))}

      <F.Control
        type="hidden"
        name="fields[1695992_1]"
        value={`${utmData} ${theme}`}
      />

      <input
        name="form_id"
        type="hidden"
        value={process.env.GATSBY_CRM_FORM_ID}
      />
      <input
        name="hash"
        type="hidden"
        value={process.env.GATSBY_CRM_FORM_HASH}
      />

      <div className="form-btn">
        <Button disabled={isSubmitting} type="submit">
          {btnText || btn}
        </Button>
      </div>
    </F>
  )
}

export default Form
