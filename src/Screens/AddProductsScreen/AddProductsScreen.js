// @flow

import React, { Component, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import AddProductsFomManager from './AddProductsFomManager'

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

class AddProductsScreen extends Component<{}> {
  render() {
    const { handleSubmit } = this.props

    return (
      <Fragment>
        <h1>Add Products</h1>
        <AddProductsFomManager
          {...this.props}
          render={({ showResults }) => (
            <form action="/" className="form" onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      name="name"
                      type="text"
                      component="input"
                      className="form-control"
                      id="name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="short-desc">Short Description</label>
                    <Field
                      name="shortDescription"
                      type="text"
                      component="textarea"
                      className="form-control"
                      id="short-desc"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <Field
                      name="description"
                      component="textarea"
                      rows="6"
                      className="form-control"
                      id="desc"
                    />
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="price">Price ($)</label>
                        <Field
                          type="number"
                          name="price"
                          component="input"
                          className="form-control"
                          id="price"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="sale-percent">Sale percent (%)</label>
                        <Field
                          type="number"
                          name="salePercent"
                          component="input"
                          className="form-control"
                          id="sale-percent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <Field
                          name="gender"
                          component="select"
                          className="form-control"
                          id="gender"
                        >
                          <option hidden />
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                          <option value="boys">Boys</option>
                          <option value="girls">Girls</option>
                        </Field>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <Field
                          name="category"
                          component="select"
                          className="form-control"
                          id="category"
                        >
                          <option hidden />
                          <option value="clothing">Clothing</option>
                          <option value="shoes">Shoes</option>
                          <option value="accessories">Accessories</option>
                        </Field>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="kind">Kind</label>
                        <Field
                          name="kind"
                          component="select"
                          className="form-control"
                          id="kind"
                        >
                          <option hidden />
                          <option value="shirts">Shirts</option>
                          <option value="jeans">Jeans</option>
                          <option value="sweaters">Sweaters</option>
                          <option value="t-shirts-and-tanks">
                            T-shirts & Tanks
                          </option>
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <fieldset>
                    <legend>Product colors</legend>

                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="colorName">Color</label>
                          <Field
                            name="colorName"
                            type="text"
                            component="select"
                            className="form-control"
                            id="colorName"
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
                            name="photos"
                            type="file"
                            component="input"
                            className="form-control"
                            id="photos"
                          />
                        </div>

                        <div className="card mb-2">
                          <div className="card-body py-2">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <label htmlFor="size">Size</label>
                                  <Field
                                    name="size"
                                    component="select"
                                    className="form-control"
                                    id="size"
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
                                  <label htmlFor="quantity">Quantity</label>
                                  <Field
                                    name="quantity"
                                    type="number"
                                    component="input"
                                    className="form-control"
                                    id="quantity"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          className="btn btn-secondary btn-small"
                          type="button"
                        >
                          Add size
                        </button>
                      </div>
                    </div>

                    <button className="btn btn-secondary" type="button">
                      Add color
                    </button>
                  </fieldset>
                </div>
              </div>

              <button className="btn btn-primary">Submit</button>
            </form>
          )}
        />
      </Fragment>
    )
  }
}

export default reduxForm({ form: 'addProducts' })(AddProductsScreen)
