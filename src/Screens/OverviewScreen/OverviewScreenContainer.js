// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Creators from 'Reduxx/productsRedux'
import OverviewScreen from './OverviewScreen'

type Props = {
  products: {
    data: Array<Object>,
    error: ?Object,
    fetching: boolean
  },
  fetchProductsRequest: () => void
}

class OverviewScreenContainer extends Component<Props> {
  unsubscribeDataChange = null

  componentDidMount() {
    this.props.fetchProductsRequest()
  }

  componentWillUnmount() {
    // if (this.unsubscribeDataChange) {
    //   this.unsubscribeDataChange()
    //   console.log('unscrible data change')
    // }
  }

  render() {
    const { products } = this.props
    return <OverviewScreen products={products} />
  }
}

const mapStateToProps = ({ products }) => ({
  products
})

const mapDispatchToProps = dispatch => ({
  fetchProductsRequest: () => dispatch(Creators.fetchProductsRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  OverviewScreenContainer
)
