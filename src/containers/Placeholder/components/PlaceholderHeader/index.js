import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Container } from 'react-bootstrap'

import placeholderLogo from '~img/placeholderLogo.svg'

import * as s from './PlaceholderHeader.module.scss'

const PlaceholderLogo = () => (
  <img width="156" height="88" src={placeholderLogo} alt="Cosmetology.ua" />
)

const PlaceholderHeader = (props) => {
  const { className, ...rest } = props

  return (
    <Container {...rest} as="header" className={cn(s.header, 'animate')}>
      <PlaceholderLogo />
    </Container>
  )
}

PlaceholderHeader.defaultProps = {
  className: undefined,
}

PlaceholderHeader.propTypes = {
  className: PropTypes.string,
}

export default PlaceholderHeader
