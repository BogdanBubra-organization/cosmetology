import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import DATA from './constants'
import * as s from './Brands.module.scss'

const Brands = ({ variant }) => {
  const { title, list } = DATA

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { regex: "/brands/" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(quality: 100, height: 48, placeholder: NONE)
            }
          }
        }
      }
    }
  `)

  const images = data?.allFile.edges.reduce(
    (acc, { node }) => ({
      ...acc,
      [node.name]: node,
    }),
    {}
  )

  return (
    <div className={s.brands}>
    {variant !== 'about' && <span className={s.brands_title} data-appear="hero">{title}</span>}
      <div className={s.brands_list_wrapper}>
        <ul className={s.brands_list} data-array="hero" data-direction="bottom">
          {list.map(({ key, alt }) => (
            <GatsbyImage
              key={key}
              loading="eager"
              image={images[key].childImageSharp.gatsbyImageData}
              alt={alt}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Brands
