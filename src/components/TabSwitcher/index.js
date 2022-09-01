import cn from 'classnames'
import React from 'react'
import { Nav } from 'react-bootstrap'

const TabSwitcher = ({ tabs, tabKeys, activeTab, action }) => {
  return (
    <Nav variant="gallery">
      {tabs.map((text, i) => (
        <Nav.Item key={tabKeys[i]}>
          <Nav.Link
            className={cn({
              active: tabKeys[i] === activeTab,
            })}
            as="button"
            onClick={() => action(tabKeys[i])}
          >
            <span data-label={text}>{text}</span>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default TabSwitcher
