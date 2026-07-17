/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from '@gatsbyjs/reach-router'
import { Button, Form as F } from 'react-bootstrap'
import { DATA } from './constants'

const Form = ({
  setSucceeded,
  service,
  expert,
  promo,
  btnText,
  fieldsSet = 'promo',
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

  const location = useLocation()

  const [pageContext, setPageContext] = useState('')

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`
    const pageUrl = `${window.location.origin}${pagePath}`
    const utmData = sessionStorage.getItem('utmData')

    setPageContext(
      utmData && utmData !== pagePath ? `${pageUrl} | UTM: ${utmData}` : pageUrl
    )
  }, [location.pathname, location.search])

  const submissionContext = [pageContext, service, expert, promo]
    .filter(Boolean)
    .join(' | ')

  const fieldsData = fields[fieldsSet] || fields.promo

  return (
    <F
      ref={formRef}
      noValidate
      validated={isSubmitted}
      onSubmit={handleSubmit(onValidSubmit)}
      className="form"
    >
      {fieldsData.map(({ label, name, pattern, required, ...rest }) => (
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
        value={submissionContext}
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
