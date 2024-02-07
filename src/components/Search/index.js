import React, { useState, useMemo } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Form } from 'react-bootstrap'
import * as s from './Search.module.scss'

const Search = () => {
  const [searchValue, setSearchValue] = useState('')

  const data = useStaticQuery(graphql`
    query SearchQuery {
      allDatoCmsService(sort: { name: ASC }) {
        nodes {
          name
          slug
        }
      }
    }
  `)

  const services = data.allDatoCmsService.nodes

  const serchResult = useMemo(
    () =>
      services.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [services, searchValue]
  )

  const randomService = services[Math.floor(Math.random() * services.length)]

  return (
    <div className={s.search}>
      <Form.Group className="form-group">
        <Form.Label>Назва послуги</Form.Label>
        <Form.Control
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={randomService.name}
        />
      </Form.Group>

      <div className={s.search_result}>
        {serchResult.length ? (
          <ul className={s.search_list}>
            {serchResult.map(({ name, slug }) => (
              <li key={slug}>
                <Link to={`/services/${slug}`} className={s.search_link}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нічого не знайдено.</p>
        )}
      </div>
    </div>
  )
}

export default Search
