import React, { useMemo, useState } from 'react'

import {
  AboutSection,
  CertificatesSection,
  ClinicGallerySection,
  ContraindicationsSection,
  DoctorsSection,
  EquipmentSection,
  FinalCtaSection,
  HeroSection,
  PreparationSection,
  PriceSection,
  ResultsSection,
  ReviewsSection,
} from './sections'
import {
  hasContent,
  hasFeatureContent,
  hasReviewContent,
  safeUrl,
} from './utils'
import * as s from './ServiceLanding.module.scss'

const ModalOrder = React.lazy(() =>
  import(/* webpackChunkName: "modal-order" */ '~components/ModalOrder')
)

const sectionDefinitions = [
  ['landingHero', HeroSection],
  ['landingAbout', AboutSection],
  ['landingPrices', PriceSection],
  ['landingEquipment', EquipmentSection],
  ['landingResults', ResultsSection],
  ['landingDoctors', DoctorsSection],
  ['landingCertificates', CertificatesSection],
  ['landingPreparation', PreparationSection],
  ['landingContraindications', ContraindicationsSection],
  ['landingClinicGallery', ClinicGallerySection],
  ['landingReviews', ReviewsSection],
  ['landingFinalCta', FinalCtaSection],
]

const hasRenderableSectionContent = (key, section, hasPrices) => {
  if (!section) return false

  const renderableSection = {
    ...section,
    features: section.features?.filter(hasFeatureContent),
    reviews: section.reviews?.filter(hasReviewContent),
  }

  if (key === 'landingHero' && !hasPrices) {
    return hasContent({ ...renderableSection, priceCtaLabel: null })
  }

  if (key === 'landingFinalCta') {
    const hasTelegram =
      hasContent(section.telegramLabel) && Boolean(safeUrl(section.telegramUrl))
    const hasViber =
      hasContent(section.viberLabel) &&
      Boolean(safeUrl(section.viberUrl, ['http:', 'https:', 'viber:']))

    return hasContent({
      ...renderableSection,
      telegramLabel: hasTelegram ? section.telegramLabel : null,
      telegramUrl: null,
      viberLabel: hasViber ? section.viberLabel : null,
      viberUrl: null,
    })
  }

  return hasContent(renderableSection)
}

const ServiceLanding = ({ name, ...landingFields }) => {
  const [showOrder, setShowOrder] = useState(false)
  const [selectedExpert, setSelectedExpert] = useState('')
  const hasPrices = hasRenderableSectionContent(
    'landingPrices',
    landingFields.landingPrices,
    false
  )
  const sections = useMemo(
    () =>
      sectionDefinitions
        .map(([key, Component]) => ({
          key,
          Component,
          section: landingFields[key],
        }))
        .filter(({ key, section }) =>
          hasRenderableSectionContent(key, section, hasPrices)
        ),
    [landingFields, hasPrices]
  )
  const primaryHeroId = hasContent(landingFields.landingHero?.title)
    ? landingFields.landingHero.id
    : null

  const handlePriceScroll = () => {
    document
      .querySelector('[data-landing-prices]')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleShowOrder = (expert) => {
    setSelectedExpert(typeof expert === 'string' ? expert : '')
    setShowOrder(true)
  }

  const handleHideOrder = () => {
    setShowOrder(false)
    setSelectedExpert('')
  }

  return (
    <div className={s.landing}>
      {sections.map(({ key, Component, section }) => (
        <Component
          {...section}
          key={section.id || key}
          isPrimaryHeading={section.id === primaryHeroId}
          onOrder={handleShowOrder}
          onPriceScroll={handlePriceScroll}
          priceCtaLabel={hasPrices ? section.priceCtaLabel : null}
        />
      ))}

      <ModalOrder
        show={showOrder}
        onHide={handleHideOrder}
        service={name}
        expert={selectedExpert}
        fieldsSet={selectedExpert ? 'promo' : 'order'}
      />
    </div>
  )
}

export default ServiceLanding
