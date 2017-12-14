// @flow

import * as React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

import AddProductColorsForm from './AddProductColorsForm'

type Props = {
  handleSubmit: () => void,
}

class AddProductsForm extends React.Component<Props> {
  render() {
    const { handleSubmit } = this.props

    return (
      <form action="/" className="form mb-4" onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
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
            </div>
          </div>
          <div className="col-sm-6">
            <FieldArray name="colors" component={AddProductColorsForm} />
          </div>
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default reduxForm({ form: 'addProducts' })(AddProductsForm)
