import { useQuery } from '@tanstack/react-query'

const usePosts = (limit = 12) => {
  const url = `https://graph.facebook.com/v14.0/${process.env.GATSBY_INSTA_ID}/media?fields=permalink,media_url,media_type,thumbnail_url&limit=12&access_token=${process.env.GATSBY_INSTA_TOKEN}`

  const getPosts = () =>
    fetch(url)
      .then((response) => response.json())
      .then((result) => result.data)

  const { data } = useQuery(['posts'], getPosts, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return data ? data.slice(0, limit) : []
}

export default usePosts
