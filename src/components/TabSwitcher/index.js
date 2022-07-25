import cn from 'classnames'
import React from 'react'
import { Nav } from 'react-bootstrap'

const TabSwitcher = ({ tabs, activeTab, action }) => {
  return (
    <Nav variant="gallery">
      {tabs.map(({ key, text }) => (
        <Nav.Item key={key}>
          <Nav.Link
            className={cn({
              active: key === activeTab,
            })}
            as="button"
            onClick={() => action(key)}
          >
            <span data-label={text}>{text}</span>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default TabSwitcher
