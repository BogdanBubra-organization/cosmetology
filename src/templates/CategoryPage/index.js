/* eslint-disable no-shadow */
import React from 'react'
import { Container } from 'react-bootstrap'
import { graphql } from 'gatsby'
import Layout from '~components/Layout'
import S from '~components/seo'
import Lights from '~components/Lights'
import Category from '~components/Category'
import Cards from '~components/Cards'
import CategoriesPreview from '~components/CategoriesPreview'
import * as s from './CategoryPage.module.scss'

const CategoryPage = (props) => {
  const {
    data: { category, systemInfo, otherCategories },
  } = props
  const { title, descr, services, subcategory } = category

  return (
    <Layout>
      <Container>
        <S title={title} />
        <div className={s.category_heading}>
          <h1 className="h2">{title}</h1>
          <p className={s.category_descr}>{descr}</p>
        </div>

        <div className={s.category_content}>
          {!subcategory.length && !!services.length && (
            <Cards variant="category" data={services} />
          )}

          {!!subcategory.length &&
            subcategory.map((item) => <Category key={item.title} {...item} />)}
        </div>

        <div className={s.category_other}>
          <h2 className={s.category_otherTitle}>
            {systemInfo.otherCategoriesTitle}
          </h2>
          <CategoriesPreview data={otherCategories.nodes} />
        </div>
      </Container>
      <Lights />
    </Layout>
  )
}

export default CategoryPage

export const pageQuery = graphql`
  query categoriesQuery($slug: String!) {
    category: datoCmsCategory(slug: { eq: $slug }) {
      title
      descr
      services {
        slug
        name
        duration
        previewImage {
          url
        }
      }
      subcategory {
        title
        services {
          slug
          name
          duration
          previewImage {
            url
          }
        }
      }
    }
    systemInfo: datoCmsServiceSystemInfo {
      otherCategoriesTitle
    }
    otherCategories: allDatoCmsCategory(filter: { slug: { ne: $slug } }) {
      nodes {
        slug
        title
        descr
        image {
          url
        }
      }
    }
  }
`
