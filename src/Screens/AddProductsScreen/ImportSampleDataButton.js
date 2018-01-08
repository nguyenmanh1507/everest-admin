// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import faker from 'faker'
import { random, range } from 'lodash'

import Creators from 'Reduxx/productRedux'

const COLORS = ['red', 'pink', 'purple', 'indigo', 'blue', 'black']
const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

type Props = {
  createProductRequest: (data: Object) => void
}

class ImportSampleDataButton extends Component<Props> {
  importSampleData = () => {
    let n = 0
    while (n < 20) {
      const productName = faker.commerce.productName()

      const product = {
        colors: range(COLORS.length).map((item, index) => ({
          name: COLORS[index],
          photos: range(4).map(item => ({
            description: productName,
            small: 'http://via.placeholder.com/90x120',
            medium: 'http://via.placeholder.com/270x360',
            large: 'http://via.placeholder.com/420x560'
          })),
          sizes: range(SIZES.length).map((item, index) => ({
            quantity: random(0, 20),
            name: SIZES[index]
          }))
        })),
        name: productName,
        shortDescription: faker.lorem.sentences(),
        description: faker.lorem.paragraphs(),
        price: faker.commerce.price(),
        gender: 'women',
        category: 'clothing',
        kind: 'shirts',
        previewImg: 'http://via.placeholder.com/270x360'
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
