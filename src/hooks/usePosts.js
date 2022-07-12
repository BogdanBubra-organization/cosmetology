import { useEffect, useState } from 'react'

const usePosts = (limit = 12) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const url = `https://graph.instagram.com/me/media?fields=permalink,media_url&limit=${limit}&access_token=${process.env.GATSBY_INSTA_TOKEN}`

    try {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setPosts(result.data)
        })
    } catch (e) {
      console.error(e)
    }
  }, [])
  return posts
}

export default usePosts
