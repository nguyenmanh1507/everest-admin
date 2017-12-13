// @flow

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navigation extends Component<{}> {
  render() {
    return (
      <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/"
              exact={true}
            >
              Overview
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/add-products"
            >
              Add products
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navigation
