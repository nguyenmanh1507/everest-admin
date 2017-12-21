// @flow

import React, { Component } from 'react'
import { Field, FieldArray } from 'redux-form'

import AddProductSizesForm from './AddProductSizesForm'
import UploadPhotos from './UploadPhotos'

const colorCodeNames = [
  'red',
  'pink',
  'purple',
  'deep-blue',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brow',
  'grey',
  'blue-grey',
  'black'
]

type Props = {
  // ISSUE: redux form flow error
  // fields: FieldArrayProps
  fields: any,
  addProductsValues: Object,
  shortUid: string,
  color: string,
  index: number
}

type State = {
  selectedColor: string
}

class AddProductColor extends Component<Props, State> {
  state = {
    selectedColor: ''
  }

  setSelectedColor = (e: any) => {
    this.setState({
      selectedColor: e.currentTarget.value
    })
  }

  render() {
    const { fields, addProductsValues, shortUid, color, index } = this.props
    const { selectedColor } = this.state

    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="form-group">
            <div className="d-flex align-items-center mb-2">
              <label htmlFor={`${color}.colorName`}>Color</label>
              {index !== 0 && (
                <button
                  className="btn btn-sm btn-danger ml-auto"
                  onClick={() => {
                    fields.remove(index)
                  }}
                  type="button"
                >
                  Remove
                </button>
              )}
            </div>
            <Field
              name={`${color}.colorName`}
              type="text"
              component="select"
              className="form-control"
              id={`${color}.colorName`}
              onChange={this.setSelectedColor}
            >
              <option hidden />
              {colorCodeNames.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Field>
          </div>

          {!!selectedColor.length && (
            <div className="form-group">
              <label htmlFor="photos">Upload photos</label>
              <Field
                name={`${color}.photos`}
                component={UploadPhotos}
                props={{
                  addProductsValues,
                  shortUid,
                  colorName: this.state.selectedColor
                }}
              />
            </div>
          )}

          <FieldArray name={`${color}.sizes`} component={AddProductSizesForm} />
        </div>
      </div>
    )
  }
}

export default AddProductColor
