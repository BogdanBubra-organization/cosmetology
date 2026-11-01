import { useEffect, useState } from 'react'

const useMatchMedia = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    const updateMatches = () => setMatches(mediaQuery.matches)
    updateMatches()
    mediaQuery.addEventListener('change', updateMatches)

    // eslint-disable-next-line consistent-return
    return () => mediaQuery.removeEventListener('change', updateMatches)
  }, [query])

  return matches
}

export default useMatchMedia
