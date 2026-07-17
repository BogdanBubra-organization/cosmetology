import React from 'react'
import PropTypes from 'prop-types'

import iconCatalog from '~service-icons/catalog.json'
import sprite from '~service-icons/icons.svg'

const iconKeys = new Set(iconCatalog.map(({ key }) => key))

export const hasServiceIcon = (name) => iconKeys.has(name)

const ServiceIcon = React.forwardRef(({ name, size, ...rest }, ref) => {
  if (!hasServiceIcon(name)) return null

  return (
    <svg
      {...rest}
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <use href={`${sprite}#service-${name}`} />
    </svg>
  )
})

ServiceIcon.defaultProps = {
  size: 24,
}

ServiceIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default ServiceIcon
