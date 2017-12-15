// @flow

import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { kebabCase } from 'lodash'
import uuidv1 from 'uuid/v1'

import { storage } from 'FirebaseConfig'

type Props = {
  input: Object,
  addProductsValues: Object,
  shortUid: string,
  colorName: string
}

class UploadPhotos extends Component<Props> {
  photoURLs: Array<{ url: string }>

  photoURLs = []

  uploadPhotos = (accepted: any, rejected: any) => {
    const {
      input,
      addProductsValues: { name: productName },
      shortUid,
      colorName
    } = this.props
    const productPhotosRef = storage.ref(
      `products/${kebabCase(productName)}-${shortUid}/${colorName}`
    )

    Promise.all(
      accepted.map(file => {
        return productPhotosRef
          .child(uuidv1())
          .put(file)
          .then(snapshot => {
            return snapshot.downloadURL
          })
          .catch(error => {
            throw Error(error)
          })
      })
    ).then(responses => {
      const newPhoto = responses.map(res => ({
        url: res
      }))

      this.photoURLs = [...this.photoURLs, ...newPhoto]
      input.onChange(this.photoURLs)
    })
  }

  render() {
    return (
      <Dropzone accept="image/jpeg, image/png" onDrop={this.uploadPhotos} />
    )
  }
}

export default UploadPhotos
