// @flow

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import AddProductColorForm from './AddProductColorForm'

type Props = {
  // ISSUE: redux form flow error
  // fields: FieldArrayProps
  fields: any,
  addProductsValues: Object,
  shortUid: string
}

class AddProductColors extends Component<Props> {
  componentDidMount() {
    this.props.fields.push({})
  }

  render() {
    const { fields, addProductsValues, shortUid } = this.props

    return (
      <Fragment>
        {fields.map((color, index) => (
          <AddProductColorForm
            key={`${color}-${index}`}
            addProductsValues={addProductsValues}
            shortUid={shortUid}
            color={color}
            fields={fields}
            index={index}
          />
        ))}

        <button
          className="btn btn-secondary btn-sm"
          type="button"
          onClick={() => {
            fields.push({})
          }}
        >
          Add color
        </button>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ form: { addProducts: { values } } }) => ({
  addProductsValues: values
})

export default connect(mapStateToProps)(AddProductColors)
