// @flow

import React, { Component, Fragment } from 'react'
import { Field } from 'redux-form'

type Props = {
  fields: any
}

class AddProductSizesForm extends Component<Props> {
  componentDidMount() {
    this.props.fields.push({})
  }

  render() {
    const { fields } = this.props

    return (
      <Fragment>
        {fields.map((size, index) => (
          <div className="card mb-2" key={`${size}-${index}`}>
            <div className="card-body py-2">
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor={`${size}.size`}>Size</label>
                    <Field
                      name={`${size}.size`}
                      component="select"
                      className="form-control"
                      id={`${size}.size`}
                    >
                      <option hidden />
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </Field>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor={`${size}.quantity`}>Quantity</label>
                    <Field
                      name={`${size}.quantity`}
                      type="number"
                      component="input"
                      className="form-control"
                      id={`${size}.quantity`}
                    />
                  </div>
                </div>
              </div>
              {index !== 0 && (
                <button
                  className="btn btn-sm btn-danger"
                  type="button"
                  onClick={() => {
                    fields.remove(index)
                  }}
                >
                  Remove
                </button>
              )}
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
          Add size
        </button>
      </Fragment>
    )
  }
}

export default AddProductSizesForm
