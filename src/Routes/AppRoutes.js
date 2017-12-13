// @flow

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import AddProductsScreen from 'Screens/AddProductsScreen'
import OverviewScreen from 'Screens/OverviewScreen'
import DashboardLayout from 'Layouts/DashboardLayout'

class AppRoutes extends Component<{}> {
  render() {
    return (
      <DashboardLayout>
        <Switch>
          <Route exact={true} path="/" component={OverviewScreen} />
          <Route path="/add-products" component={AddProductsScreen} />
        </Switch>
      </DashboardLayout>
    )
  }
}

export default AppRoutes
