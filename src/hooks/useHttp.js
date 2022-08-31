import { useState, useCallback } from 'react'

const useHttp = () => {
  const [loading, setLoading] = useState(false)

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true)

      try {
        const response = await fetch(url, { body, method, headers })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong')
        }

        setLoading(false)
        return data
      } catch (e) {
        setLoading(false)
        throw e
      }
    },
    []
  )

  return { loading, request }
}

export default useHttp
