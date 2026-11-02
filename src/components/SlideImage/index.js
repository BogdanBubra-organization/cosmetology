import React, { useEffect, useMemo, useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useSwiperSlide } from 'swiper/react'

const EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

const SlideImage = ({ image, initiallyVisible = false, ...props }) => {
  const slide = useSwiperSlide()
  const [requested, setRequested] = useState(initiallyVisible)
  const nearby = !slide || slide.isActive || slide.isNext || slide.isVisible
  const enabled = requested || nearby

  useEffect(() => {
    if (nearby) setRequested(true)
  }, [nearby])

  const placeholder = useMemo(() => {
    if (!image) return image
    const fallback = image.placeholder?.fallback?.startsWith('data:')
      ? image.placeholder.fallback
      : EMPTY_IMAGE

    return {
      ...image,
      placeholder: { fallback },
      images: {
        fallback: { src: fallback },
        sources: [],
      },
    }
  }, [image])

  return (
    <GatsbyImage
      key={enabled ? 'image' : 'placeholder'}
      image={enabled ? image : placeholder}
      {...props}
    />
  )
}

export default SlideImage
