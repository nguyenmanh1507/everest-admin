// @flow

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import AddProductsFom from './AddProductsFom'
import Creators from 'Reduxx/productRedux'
import ImportSampleDataButton from './ImportSampleDataButton'

type Props = {
  createProductRequest: (data: Object) => void
}

class AddProductsScreen extends Component<Props> {
  createProduct = (data: Object) => {
    this.props.createProductRequest(data)
  }

  render() {
    return (
      <Fragment>
        <h1>Add Products</h1>
        <ImportSampleDataButton />
        <AddProductsFom onSubmit={this.createProduct} />
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createProductRequest: data => {
    dispatch(Creators.createProductRequest(data))
  }
})

export default connect(null, mapDispatchToProps)(AddProductsScreen)
