// @flow

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
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
  shortUid: string
}

type State = {
  selectedColor: string
}

class AddProductColors extends Component<Props, State> {
  state = {
    selectedColor: ''
  }

  componentDidMount() {
    this.props.fields.push({})
  }

  logData(accepted: any, rejected: any) {
    console.log(accepted)
  }

  setSelectedColor = (e: any) => {
    this.setState({
      selectedColor: e.currentTarget.value
    })
  }

  render() {
    const { fields, addProductsValues, shortUid } = this.props

    return (
      <Fragment>
        {fields.map((color, index) => (
          <div className="card mb-3" key={`${color}-${index}`}>
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

              <FieldArray
                name={`${color}.sizes`}
                component={AddProductSizesForm}
              />
            </div>
          </div>
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
