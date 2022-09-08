import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Container } from 'react-bootstrap'

import Icon from '~components/Icon'

import PlaceholderSocials from '../PlaceholderSocials'

import * as s from './PlaceholderFooter.module.scss'

const PlaceholderFooter = (props) => {
  const { className, ...rest } = props

  return (
    <Container {...rest} as="footer" className={cn(s.footer, 'animate')}>
      <div className={cn(s.footer_inner)}>
        <PlaceholderSocials variant="footer" />
        <a
          className={s.footer_address}
          href="/maps"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="mark" size={20} />
          м.Чернігів, вул. Гоголя, 3
        </a>
        <div className={s.footer_author}>
          Дизайн та розробка{' '}
          <a href="https://min.studio" target="_blank" rel="noreferrer">
            min.studio
          </a>
        </div>
      </div>
    </Container>
  )
}

PlaceholderFooter.defaultProps = {
  className: undefined,
}

PlaceholderFooter.propTypes = {
  className: PropTypes.string,
}

export default PlaceholderFooter
