// @flow

import React, { Component, Fragment } from 'react'
import { Field } from 'redux-form'

type Props = {
  photoURLs: Array<string>,
  fields: any
}

class AddProductPhotos extends Component<Props> {
  // componentWillReceiveProps(nextProps: Object) {
  //   const { fields } = this.props
  //   const { photoURLs } = nextProps
  //   photoURLs.forEach(photo => {
  //     fields.push({ url: photo })
  //   })
  //   console.log(nextProps)
  // }

  render() {
    const { photoURLs, fields } = this.props
    return (
      <Fragment>
        {fields.map((photo, index) => (
          <Field
            key={`photo-url-${index}`}
            name={`${photo}.photo`}
            type="text"
            component="input"
            hidden
          />
        ))}
      </Fragment>
    )
  }
}

export default AddProductPhotos
