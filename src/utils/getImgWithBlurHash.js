import { getImage } from 'gatsby-plugin-image'

const getImgWithBlurHash = (file) => ({
  ...getImage(file),
  placeholder: {
    fallback: file?.childImageSharp?.blurHash?.base64Image,
  },
})

export default getImgWithBlurHash
