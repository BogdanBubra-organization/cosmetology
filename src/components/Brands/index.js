import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import DATA from './constants'
import * as s from './Brands.module.scss'

const Brands = () => {
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
      <span className={s.brands_title}>{title}</span>
      <ul className={s.brands_list}>
        {list.map(({ key, alt }) => {
          return (
            <GatsbyImage
              key={key}
              loading="eager"
              image={images[key].childImageSharp.gatsbyImageData}
              alt={alt}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default Brands
