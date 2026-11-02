import { useEffect, useState } from 'react'

const useSwiperKey = () => {
  const [key, setKey] = useState('static')

  useEffect(() => {
    // Hydration recovery can leave Swiper attached to discarded DOM nodes.
    setKey('interactive')
  }, [])

  return key
}

export default useSwiperKey
