// @flow

import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

import store from './Reduxx'
import AppRoutes from 'Routes/AppRoutes'
import './App.css'

class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route component={AppRoutes} />
        </Router>
      </Provider>
    )
  }
}

export default App
