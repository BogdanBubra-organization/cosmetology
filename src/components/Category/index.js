import React, { useState } from 'react'
import cn from 'classnames'
import { Button, Collapse } from 'react-bootstrap'
import { Link } from 'gatsby'
import Cards from '~components/Cards'
import useMatchMedia from '~hooks/useMatchMedia'
import { SERVICE_PAGE_SLUG } from '~constants'
import * as s from './Category.module.scss'

const Category = ({
  slug,
  title,
  descr,
  services,
  buttonText,
  isPricesPage,
  isServices,
}) => {
  const [open, setOpen] = useState(true)
  const isMobile = useMatchMedia('(max-width: 767px)')

  const data = isServices ? services.slice(0, 6) : services

  return (
    <div className={cn(s.category, { [s.show]: !isMobile || open })}>
      {isMobile ? (
        <button
          type="button"
          className={s.category_collapseBtn}
          onClick={() => setOpen((prev) => !prev)}
        >
          <h4>{title}</h4>
        </button>
      ) : (
        <h4>{title}</h4>
      )}

      <Collapse in={!isMobile || open}>
        <div className={s.category_wrapper}>
          {descr && <p className={s.category_descr}>{descr}</p>}

          <Cards data={data} variant="services" isPricesPage={isPricesPage} />

          {slug && (
            <div className={s.category_btn}>
              <Button
                as={Link}
                to={`/${SERVICE_PAGE_SLUG[0]}/${slug}`}
                variant="secondary"
              >
                {buttonText || 'Всі послуги'}
              </Button>
            </div>
          )}
        </div>
      </Collapse>
    </div>
  )
}

export default Category
