// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import faker from 'faker'

import Creators from 'Reduxx/productRedux'

type Props = {
  createProductRequest: (data: Object) => void
}

class ImportSampleDataButton extends Component<Props> {
  importSampleData = () => {
    let n = 0
    while (n < 20) {
      const product = {
        colors: [
          {
            sizes: [{}]
          }
        ],
        name: faker.commerce.productName(),
        shortDescription: faker.lorem.sentences(),
        description: faker.lorem.paragraphs(),
        price: faker.commerce.price(),
        gender: 'men',
        category: 'clothing',
        kind: 'shirts'
      }

      this.props.createProductRequest(product)
      n++
    }
  }

  render() {
    return (
      <button className="btn btn-primary mb-4" onClick={this.importSampleData}>
        Import sample data
      </button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createProductRequest: data => {
    dispatch(Creators.createProductRequest(data))
  }
})

export default connect(null, mapDispatchToProps)(ImportSampleDataButton)
