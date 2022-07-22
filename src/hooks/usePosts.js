import { useQuery } from '@tanstack/react-query'

const usePosts = (limit = 12) => {
  const url = `https://graph.facebook.com/v14.0/${process.env.GATSBY_INSTA_ID}/media?fields=permalink,media_url,media_type,thumbnail_url&limit=12&access_token=${process.env.GATSBY_INSTA_TOKEN}`

  const getPosts = () =>
    fetch(url)
      .then((response) => response.json())
      .then((result) => result.data)

  const { data, isLoading } = useQuery(['posts'], getPosts, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  })

  const posts = data ? data.slice(0, limit) : []

  return { posts, isLoading }
}

export default usePosts
