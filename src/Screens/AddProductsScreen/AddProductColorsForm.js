// @flow

import React, { Component, Fragment } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { Field, FieldArray } from 'redux-form'
import { kebabCase, uniqueId } from 'lodash'
import uuidv1 from 'uuid/v1'

// import type { FieldArrayProps } from 'redux-form'

import AddProductSizesForm from './AddProductSizesForm'
import { storage } from 'FirebaseConfig'

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
  addProductsValues: Object
}

class AddProductColors extends Component<Props> {  
  componentDidMount() {
    this.props.fields.push({})
    this.colorIndex = 
  }

  uploadPhotos = (accepted: any, rejected: any) => {
    const productName = this.props.addProductsValues.name
    const productPhotosRef = storage.ref(
      `products/${kebabCase(productName)}-${uniqueId()}/colorName`
    )

    console.log(this.props)

    // accepted.forEach(file => {
    //   productPhotosRef
    //     .child(uuidv1())
    //     .put(file)
    //     .then(snapshot => {
    //       console.log('Uploaded a blob or file!', snapshot)
    //     })
    // })
  }

  logData(accepted: any, rejected: any) {
    console.log(accepted)
  }

  render() {
    const { fields } = this.props

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
                <Dropzone
                  accept="image/jpeg, image/png"
                  onDrop={this.uploadPhotos}
                />
                {/* <Field
                  name="photos"
                  type="file"
                  component="input"
                  className="form-control"
                  id="photos"
                /> */}
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
