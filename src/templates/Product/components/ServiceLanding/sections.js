import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { StructuredText } from 'react-datocms'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Keyboard, Navigation } from 'swiper'
import cn from 'classnames'

import Icon from '~components/Icon'
import MediaWrap from '~components/MediaWrap'
import Modal from '~components/Modal'
import ServiceIcon, { hasServiceIcon } from '~components/ServiceIcon'
import SwiperButtons from '~components/SwiperButtons'

import {
  compactContent,
  hasContent,
  hasFeatureContent,
  hasReviewContent,
  mediaAlt,
  safeUrl,
  textContent,
} from './utils'
import * as s from './ServiceLanding.module.scss'

const SectionIntro = ({ title, description, centered = true }) => {
  const visibleTitle = textContent(title)

  if (!visibleTitle && !hasContent(description)) return null

  return (
    <header
      className={cn(s.sectionIntro, { [s.sectionIntroCentered]: centered })}
    >
      {visibleTitle && <h2>{visibleTitle}</h2>}
      {hasContent(description) && (
        <div className={s.richText}>
          <StructuredText data={description.value} />
        </div>
      )}
    </header>
  )
}

const FeatureGrid = ({ features, compact = false }) => {
  const visibleFeatures = (features || []).filter(hasFeatureContent)

  if (!visibleFeatures.length) return null

  return (
    <div
      className={cn(s.featureGrid, {
        [s.featureGridCompact]: compact,
        [s.featureGridSingle]: visibleFeatures.length === 1,
        [s.featureGridPair]: visibleFeatures.length === 2,
      })}
    >
      {visibleFeatures.map(({ id, iconKey, title, text }) => {
        const visibleIconKey = textContent(iconKey)
        const visibleTitle = textContent(title)
        const visibleText = textContent(text)

        return (
          <article className={s.featureCard} key={id}>
            {hasServiceIcon(visibleIconKey) && (
              <span className={s.featureIcon} aria-hidden="true">
                <ServiceIcon name={visibleIconKey} size={28} />
              </span>
            )}
            <div>
              {visibleTitle && <h3 className={s.cardTitle}>{visibleTitle}</h3>}
              {visibleText && <p>{visibleText}</p>}
            </div>
          </article>
        )
      })}
    </div>
  )
}

const LandingGallery = ({ media, title, variant }) => {
  const [modal, setModal] = useState({ show: false, active: 0 })
  const visibleMedia = compactContent(media)

  if (!visibleMedia.length) return null

  const desktopSlides = variant === 'certificates' ? 4 : 3
  const showNavigation = visibleMedia.length > desktopSlides

  return (
    <>
      <div className={s.galleryMask}>
        <Swiper
          className={cn('swiper--gallery', s.gallery, s[`gallery-${variant}`], {
            [s.gallerySingle]: visibleMedia.length === 1,
          })}
          slidesPerView={1}
          spaceBetween={12}
          keyboard={{ enabled: true }}
          navigation={
            showNavigation
              ? {
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }
              : false
          }
          breakpoints={{
            576: {
              slidesPerView: Math.min(2, visibleMedia.length),
              spaceBetween: 16,
            },
            992: {
              slidesPerView: Math.min(desktopSlides, visibleMedia.length),
              spaceBetween: 20,
            },
          }}
          modules={[Keyboard, Navigation]}
        >
          {visibleMedia.map((item, index) => (
            <SwiperSlide key={item.url}>
              <button
                type="button"
                className={s.galleryButton}
                onClick={() => setModal({ show: true, active: index })}
                aria-label={`Відкрити зображення ${index + 1}`}
              >
                <GatsbyImage
                  className={s.galleryImage}
                  image={getImage(item)}
                  alt={mediaAlt(item, title)}
                  objectFit="cover"
                />
              </button>
            </SwiperSlide>
          ))}

          {showNavigation && (
            <SwiperButtons className="btn-round">
              <Icon name="swiper-arrow" size={24} />
            </SwiperButtons>
          )}
        </Swiper>
      </div>

      <Modal
        show={modal.show}
        onHide={() => setModal({ show: false, active: 0 })}
        variant="swiper"
      >
        <Swiper
          effect="fade"
          keyboard={{ enabled: true }}
          navigation={
            showNavigation
              ? {
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }
              : false
          }
          autoHeight
          modules={[EffectFade, Keyboard, Navigation]}
          initialSlide={modal.active}
          className="swiper--modal swipper--autoheightMobile"
        >
          {visibleMedia.map((item) => (
            <SwiperSlide key={item.url}>
              <MediaWrap media={item}>
                <GatsbyImage
                  className="modal-pic"
                  image={getImage(item)}
                  alt={mediaAlt(item, title)}
                  objectFit="contain"
                />
              </MediaWrap>
            </SwiperSlide>
          ))}

          {showNavigation && (
            <SwiperButtons className="swiper-button-sm">
              <Icon name="swiper-arrow-sm" size={20} />
            </SwiperButtons>
          )}
        </Swiper>
      </Modal>
    </>
  )
}

export const HeroSection = ({
  title,
  description,
  image,
  badge,
  primaryCtaLabel,
  priceCtaLabel,
  features,
  isPrimaryHeading,
  onOrder,
  onPriceScroll,
}) => {
  const Heading = isPrimaryHeading ? 'h1' : 'h2'
  const visibleBadge = textContent(badge)
  const visibleTitle = textContent(title)
  const visiblePrimaryCta = textContent(primaryCtaLabel)
  const visiblePriceCta = textContent(priceCtaLabel)
  const showActions = visiblePrimaryCta || visiblePriceCta

  return (
    <section className={cn(s.section, s.hero)}>
      <Container className={s.heroGrid}>
        <div className={s.heroContent}>
          {visibleBadge && <span className={s.badge}>{visibleBadge}</span>}
          {visibleTitle && (
            <Heading className={s.heroTitle}>{visibleTitle}</Heading>
          )}
          {hasContent(description) && (
            <div className={cn(s.richText, s.heroDescription)}>
              <StructuredText data={description.value} />
            </div>
          )}
          {showActions && (
            <div className={s.actions}>
              {visiblePrimaryCta && (
                <Button onClick={onOrder}>{visiblePrimaryCta}</Button>
              )}
              {visiblePriceCta && (
                <Button variant="secondary" onClick={onPriceScroll}>
                  {visiblePriceCta}
                </Button>
              )}
            </div>
          )}
        </div>

        {image?.gatsbyImageData && (
          <div className={s.heroMedia}>
            <GatsbyImage
              className={s.heroImage}
              image={getImage(image)}
              alt={mediaAlt(image, visibleTitle)}
              loading="eager"
              objectFit="cover"
            />
          </div>
        )}

        <FeatureGrid features={features} compact />
      </Container>
    </section>
  )
}

export const AboutSection = ({ title, description, features }) => (
  <section className={cn(s.section, s.about)}>
    <Container>
      <SectionIntro title={title} description={description} />
      <FeatureGrid features={features} />
    </Container>
  </section>
)

export const PriceSection = ({ title, description, categories, note }) => {
  const visibleCategories = compactContent(categories)
  const visibleNote = textContent(note)

  return (
    <section className={cn(s.section, s.prices)} data-landing-prices>
      <Container>
        <SectionIntro title={title} description={description} />
        {!!visibleCategories.length && (
          <div
            className={cn(s.priceGrid, {
              [s.priceGridSingle]: visibleCategories.length === 1,
              [s.priceGridPair]: visibleCategories.length === 2,
            })}
          >
            {visibleCategories.map((category) => {
              const items = compactContent(category.items)
              const categoryTitle = textContent(category.title)

              return (
                <article className={s.priceCard} key={category.id}>
                  {categoryTitle && <h3>{categoryTitle}</h3>}
                  {!!items.length && (
                    <ul className={s.priceList}>
                      {items.map((item) => {
                        const itemTitle = textContent(item.title)
                        const price = textContent(item.price)
                        const previousPrice = textContent(item.previousPrice)
                        const itemNote = textContent(item.note)

                        return (
                          <li key={item.id}>
                            <div className={s.priceItemHeading}>
                              {itemTitle && <span>{itemTitle}</span>}
                              {(price || previousPrice) && (
                                <span className={s.priceValue}>
                                  {previousPrice && <del>{previousPrice}</del>}
                                  {price}
                                </span>
                              )}
                            </div>
                            {itemNote && <p>{itemNote}</p>}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </article>
              )
            })}
          </div>
        )}
        {visibleNote && <p className={s.sectionNote}>{visibleNote}</p>}
      </Container>
    </section>
  )
}

export const EquipmentSection = ({ title, description, image, features }) => (
  <section className={cn(s.section, s.equipment)}>
    <Container className={s.splitGrid}>
      <div className={s.splitContent}>
        <SectionIntro
          title={title}
          description={description}
          centered={false}
        />
        <FeatureGrid features={features} compact />
      </div>
      {image?.gatsbyImageData && (
        <GatsbyImage
          className={s.splitImage}
          image={getImage(image)}
          alt={mediaAlt(image, title)}
          objectFit="cover"
        />
      )}
    </Container>
  </section>
)

const GallerySection = ({ title, description, gallery, variant }) => (
  <section className={cn(s.section, s.gallerySection)}>
    <Container>
      <SectionIntro title={title} description={description} />
      <LandingGallery media={gallery} title={title} variant={variant} />
    </Container>
  </section>
)

export const ResultsSection = (props) => (
  <GallerySection {...props} variant="results" />
)

export const CertificatesSection = (props) => (
  <GallerySection {...props} variant="certificates" />
)

export const ClinicGallerySection = (props) => (
  <GallerySection {...props} variant="clinic" />
)

export const DoctorsSection = ({ title, description, doctors, onOrder }) => {
  const visibleDoctors = compactContent(doctors)

  return (
    <section className={cn(s.section, s.doctors)}>
      <Container>
        <SectionIntro title={title} description={description} />
        {!!visibleDoctors.length && (
          <div
            className={cn(s.doctorGrid, {
              [s.doctorGridSingle]: visibleDoctors.length === 1,
              [s.doctorGridPair]: visibleDoctors.length === 2,
            })}
          >
            {visibleDoctors.map((doctor) => {
              const name = textContent(doctor.name)
              const specialty = textContent(doctor.specialty)
              const descriptionText = textContent(doctor.description)
              const ctaLabel = textContent(doctor.ctaLabel)

              return (
                <article className={s.doctorCard} key={doctor.id}>
                  {doctor.photo?.gatsbyImageData && (
                    <GatsbyImage
                      className={s.doctorImage}
                      image={getImage(doctor.photo)}
                      alt={mediaAlt(doctor.photo, name)}
                      objectFit="cover"
                    />
                  )}
                  <div className={s.doctorContent}>
                    {name && <h3>{name}</h3>}
                    {specialty && (
                      <p className={s.doctorSpecialty}>{specialty}</p>
                    )}
                    {descriptionText && <p>{descriptionText}</p>}
                    {ctaLabel && (
                      <Button variant="secondary" onClick={() => onOrder(name)}>
                        {ctaLabel}
                      </Button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </Container>
    </section>
  )
}

const ListSection = ({ title, description, items, note, variant }) => {
  const visibleItems = compactContent(items)
  const visibleNote = textContent(note)

  return (
    <section
      className={cn(s.section, s.listSection, s[`listSection-${variant}`])}
    >
      <Container>
        <SectionIntro title={title} description={description} />
        {!!visibleItems.length && (
          <ul className={s.checkList}>
            {visibleItems.map((item) => (
              <li key={item.id}>
                <Icon name="landing-check" size={22} aria-hidden="true" />
                <span>{textContent(item.text)}</span>
              </li>
            ))}
          </ul>
        )}
        {visibleNote && <p className={s.sectionNote}>{visibleNote}</p>}
      </Container>
    </section>
  )
}

export const PreparationSection = (props) => (
  <ListSection {...props} variant="preparation" />
)

export const ContraindicationsSection = (props) => (
  <ListSection {...props} variant="contraindications" />
)

export const ReviewsSection = ({ title, description, reviews }) => {
  const visibleReviews = (reviews || []).filter(hasReviewContent)
  const showNavigation = visibleReviews.length > 3

  return (
    <section className={cn(s.section, s.reviews)}>
      <Container>
        <SectionIntro title={title} description={description} />
        {!!visibleReviews.length && (
          <Swiper
            className={cn(s.reviewSlider, {
              [s.reviewSliderSingle]: visibleReviews.length === 1,
            })}
            slidesPerView={1}
            spaceBetween={16}
            keyboard={{ enabled: true }}
            navigation={
              showNavigation
                ? {
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                  }
                : false
            }
            breakpoints={{
              768: { slidesPerView: Math.min(2, visibleReviews.length) },
              1200: { slidesPerView: Math.min(3, visibleReviews.length) },
            }}
            modules={[Keyboard, Navigation]}
          >
            {visibleReviews.map((review) => {
              const rating = Math.min(5, Math.max(0, review.rating || 0))
              const name = textContent(review.name)
              const reviewText = textContent(review.text)

              return (
                <SwiperSlide key={review.id}>
                  <article className={s.reviewCard}>
                    <div className={s.reviewHeader}>
                      {review.photo?.gatsbyImageData && (
                        <GatsbyImage
                          className={s.reviewAvatar}
                          image={getImage(review.photo)}
                          alt={mediaAlt(review.photo, name)}
                          objectFit="cover"
                        />
                      )}
                      <div>
                        {name && <h3>{name}</h3>}
                        {!!rating && (
                          <div className={s.stars} aria-label={`${rating} з 5`}>
                            {Array.from({ length: rating }, (_, index) => (
                              <Icon
                                name="star"
                                size={15}
                                key={`${review.id}-star-${index + 1}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {reviewText && <p>{reviewText}</p>}
                  </article>
                </SwiperSlide>
              )
            })}

            {showNavigation && (
              <SwiperButtons className="btn-round">
                <Icon name="swiper-arrow" size={24} />
              </SwiperButtons>
            )}
          </Swiper>
        )}
      </Container>
    </section>
  )
}

export const FinalCtaSection = ({
  title,
  description,
  image,
  badge,
  appointmentLabel,
  telegramLabel,
  telegramUrl,
  viberLabel,
  viberUrl,
  onOrder,
}) => {
  const visibleTitle = textContent(title)
  const visibleBadge = textContent(badge)
  const visibleAppointmentLabel = textContent(appointmentLabel)
  const visibleTelegramLabel = textContent(telegramLabel)
  const visibleTelegramUrl = safeUrl(telegramUrl)
  const visibleViberLabel = textContent(viberLabel)
  const visibleViberUrl = safeUrl(viberUrl, ['http:', 'https:', 'viber:'])
  const showTelegram = visibleTelegramLabel && visibleTelegramUrl
  const showViber = visibleViberLabel && visibleViberUrl
  const showActions = visibleAppointmentLabel || showTelegram || showViber

  return (
    <section className={cn(s.section, s.finalCta)}>
      <Container className={s.finalCtaCard}>
        <div className={s.finalCtaContent}>
          {visibleBadge && <span className={s.badge}>{visibleBadge}</span>}
          {visibleTitle && <h2>{visibleTitle}</h2>}
          {hasContent(description) && (
            <div className={s.richText}>
              <StructuredText data={description.value} />
            </div>
          )}
          {showActions && (
            <div className={s.actions}>
              {visibleAppointmentLabel && (
                <Button onClick={onOrder}>{visibleAppointmentLabel}</Button>
              )}
              {showTelegram && (
                <Button
                  as="a"
                  href={visibleTelegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  className="btn-icon"
                >
                  <Icon name="telegram" size={20} />
                  {visibleTelegramLabel}
                </Button>
              )}
              {showViber && (
                <Button
                  as="a"
                  href={visibleViberUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  className="btn-icon"
                >
                  <Icon name="viber" size={20} />
                  {visibleViberLabel}
                </Button>
              )}
            </div>
          )}
        </div>
        {image?.gatsbyImageData && (
          <GatsbyImage
            className={s.finalCtaImage}
            image={getImage(image)}
            alt={mediaAlt(image, visibleTitle)}
            objectFit="cover"
          />
        )}
      </Container>
    </section>
  )
}
