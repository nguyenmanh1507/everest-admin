// @flow

import React, { Component, Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'

import Navigation from 'Components/Navigation'

type Props = {
  children: any
}

class DashboardLayout extends Component<Props> {
  render() {
    const { children } = this.props

    return (
      <Fragment>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link className="navbar-brand" to="/">
              Dashboard
            </Link>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExampleDefault"
              aria-controls="navbarsExampleDefault"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarsExampleDefault"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Settings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Help
                  </NavLink>
                </li>
              </ul>
              <form className="form-inline mt-2 mt-md-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </nav>
        </header>

        <div className="container-fluid">
          <div className="row">
            <Navigation />

            <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
              {children}
            </main>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default DashboardLayout
