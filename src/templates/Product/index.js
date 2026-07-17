import React from 'react'
import { Container } from 'react-bootstrap'
import { graphql } from 'gatsby'
import cn from 'classnames'
import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import Reviews from '~components/Reviews'
import ProductHero from './components/ProductHero'
import ServiceLanding from './components/ServiceLanding'

import * as s from './Product.module.scss'
import SameProducts from './components/SameProducts'

const Product = (props) => {
  const {
    pageContext: { isPricingPage },
    data: { product, sameServices, sameServicesUncategorized, systemInfo },
  } = props
  const { name, isLanding } = product
  const useLandingTemplate = isLanding && !isPricingPage

  return (
    <Layout isShortVariant={isPricingPage}>
      {useLandingTemplate ? (
        <>
          <S title={name} />
          <ServiceLanding {...product} />
        </>
      ) : (
        <Container className={cn({ [s.shortContainer]: isPricingPage })}>
          <S title={name} />
          <h1 className={cn('h2', s.productTitle)}>{name}</h1>
          <ProductHero {...product} {...systemInfo} />
          {!isPricingPage && (
            <SameProducts
              list={
                sameServices.nodes.length
                  ? sameServices.nodes
                  : sameServicesUncategorized.nodes
              }
              title={systemInfo?.otherProceduresTitle}
            />
          )}
          <Reviews variant="product" />
        </Container>
      )}
      <Lights />
    </Layout>
  )
}

export default Product

export const pageQuery = graphql`
  query servicesQuery($slug: String!, $id: String!, $category: String!) {
    product: datoCmsService(slug: { eq: $slug }) {
      isLanding
      name
      descr {
        value
      }
      price
      priceFrom
      priceTo
      previewImage {
        url
      }
      media {
        url
        video {
          thumbnailUrl
        }
        gatsbyImageData(
          placeholder: NONE
          forceBlurhash: true
          imgixParams: { fit: "crop", auto: "compress,format" }
        )
      }
      instagramLink
      warningSection {
        title
        warningList {
          name
        }
      }
      landingHero {
        id
        title
        description {
          value
        }
        image {
          url
          alt
          title
          gatsbyImageData(
            width: 760
            height: 900
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
        badge
        primaryCtaLabel
        priceCtaLabel
        features {
          id
          iconKey
          title
          text
        }
      }
      landingAbout {
        id
        title
        description {
          value
        }
        features {
          id
          iconKey
          title
          text
        }
      }
      landingPrices {
        id
        title
        description {
          value
        }
        categories {
          id
          title
          items {
            id
            title
            price
            previousPrice
            note
          }
        }
        note
      }
      landingEquipment {
        id
        title
        description {
          value
        }
        image {
          url
          alt
          title
          gatsbyImageData(
            width: 720
            height: 810
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
        features {
          id
          iconKey
          title
          text
        }
      }
      landingResults {
        id
        title
        description {
          value
        }
        gallery {
          url
          alt
          title
          gatsbyImageData(
            width: 900
            height: 675
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
      }
      landingDoctors {
        id
        title
        description {
          value
        }
        doctors {
          id
          photo {
            url
            alt
            title
            gatsbyImageData(
              width: 480
              height: 640
              placeholder: NONE
              forceBlurhash: true
              imgixParams: { fit: "crop", auto: "compress,format" }
            )
          }
          name
          specialty
          description
          ctaLabel
        }
      }
      landingCertificates {
        id
        title
        description {
          value
        }
        gallery {
          url
          alt
          title
          gatsbyImageData(
            width: 600
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "max", auto: "compress,format" }
          )
        }
      }
      landingPreparation {
        id
        title
        description {
          value
        }
        items {
          id
          text
        }
      }
      landingContraindications {
        id
        title
        description {
          value
        }
        items {
          id
          text
        }
        note
      }
      landingClinicGallery {
        id
        title
        description {
          value
        }
        gallery {
          url
          alt
          title
          gatsbyImageData(
            width: 900
            height: 675
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
      }
      landingReviews {
        id
        title
        description {
          value
        }
        reviews {
          id
          photo {
            url
            alt
            title
            gatsbyImageData(
              width: 108
              height: 108
              placeholder: NONE
              forceBlurhash: true
              imgixParams: { fit: "crop", auto: "compress,format" }
            )
          }
          name
          rating
          text
        }
      }
      landingFinalCta {
        id
        title
        description {
          value
        }
        image {
          url
          alt
          title
          gatsbyImageData(
            width: 720
            height: 800
            placeholder: NONE
            forceBlurhash: true
            imgixParams: { fit: "crop", auto: "compress,format" }
          )
        }
        badge
        appointmentLabel
        telegramLabel
        telegramUrl
        viberLabel
        viberUrl
      }
    }
    sameServices: allDatoCmsService(
      limit: 4
      filter: { category: { eq: $category }, id: { ne: $id } }
    ) {
      nodes {
        slug
        name
        duration
        previewImage {
          url
        }
      }
    }
    sameServicesUncategorized: allDatoCmsService(
      limit: 4
      filter: { id: { ne: $id } }
    ) {
      nodes {
        slug
        name
        duration
        previewImage {
          url
        }
      }
    }
    systemInfo: datoCmsServiceSystemInfo {
      imageTitle
      descrTitle
      otherProceduresTitle
    }
  }
`
