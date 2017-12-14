// @flow

import React, { Component, Fragment } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { Field, FieldArray } from 'redux-form'
import { kebabCase } from 'lodash'
import uuidv1 from 'uuid/v1'

// import type { FieldArrayProps } from 'redux-form'

import AddProductSizesForm from './AddProductSizesForm'
import AddProductPhotos from './AddProductPhotos'
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

type State = {
  photoURLs: Array<string>
}

class AddProductColors extends Component<Props, State> {
  state = {
    photoURLs: []
  }

  shortUid = uuidv1().slice(0, 5)

  componentDidMount() {
    this.props.fields.push({})
  }

  uploadPhotos = (accepted: any, rejected: any) => {
    const { addProductsValues: { name: productName } } = this.props
    const productPhotosRef = storage.ref(
      `products/${kebabCase(productName)}-${this.shortUid}/colorName`
    )

    Promise.all(
      accepted.map(file => {
        return productPhotosRef
          .child(uuidv1())
          .put(file)
          .then(snapshot => {
            console.log('Uploaded a blob or file!', snapshot.downloadURL)
            return snapshot.downloadURL
          })
          .catch(error => {
            throw Error(error)
          })
      })
    ).then(responses => {
      console.log('set state', responses)
      this.setState(prevState => ({
        photoURLs: [...prevState.photoURLs, ...responses]
      }))
    })
  }

  logData(accepted: any, rejected: any) {
    console.log(accepted)
  }

  render() {
    const { photoURLs } = this.state
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

                <FieldArray
                  name={`${color}.photos`}
                  component={AddProductPhotos}
                  props={{ photoURLs }}
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
