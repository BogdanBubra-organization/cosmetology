import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { StructuredText } from 'react-datocms'
import useMatchMedia from '~hooks/useMatchMedia'
import cn from 'classnames'
import * as s from './ExpertsItem.module.scss'

const ModalOrder = React.lazy(() =>
  import(/* webpackChunkName: "modal-order" */ '~components/ModalOrder')
)

const ExpertsItem = ({ title, subtitle, description, photo }) => {
  const [open, setOpen] = useState(false)
  const isMobile = useMatchMedia('(max-width: 767px)')

  const [showOrder, setShowOrder] = useState(false)

  const handleShowOrder = () => setShowOrder(true)
  return (
    <div className={s.expert}>
      <GatsbyImage
        image={getImage(photo)}
        alt={title}
        className={s.expert_photo}
      />
      <h3 className={s.expert_title}>{title}</h3>
      <span className={s.expert_subtitle}>{subtitle}</span>

      {isMobile && (
        <button
          type="button"
          className={cn(s.expert_btn, {
            [s.open]: open,
          })}
          onClick={() => setOpen((prev) => !prev)}
        >
          Детальна інформація
        </button>
      )}

      <Collapse in={!isMobile || open}>
        <div className={s.expert_description}>
          <StructuredText data={description.value} />
        </div>
      </Collapse>

      <div className={s.expert_cta}>
        <Button onClick={handleShowOrder} variant="secondary">
          Записатись на процедуру
        </Button>
      </div>

      <ModalOrder
        show={showOrder}
        onHide={() => setShowOrder(false)}
        expert={title}
      />
    </div>
  )
}

export default ExpertsItem
