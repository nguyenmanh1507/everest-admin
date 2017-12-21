// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { kebabCase, isEqual } from 'lodash'

import Creators from 'Reduxx/photosRedux'

type Props = {
  input: Object,
  addProductsValues: Object,
  shortUid: string,
  colorName: string,
  uploadPhotosRequest: (
    photos: Array<any>,
    dir: string,
    colorName: string
  ) => void,
  photos: {
    uploading: boolean,
    error: Object,
    colors: Object
  }
}

class UploadPhotos extends Component<Props> {
  colorPhotos: Array<{ url: string }>
  colorPhotos = []

  uploadPhotos = (accepted: any, rejected: any) => {
    const {
      addProductsValues: { name: productName },
      shortUid,
      colorName
    } = this.props

    const dir = `${kebabCase(productName)}-${shortUid}/${colorName}`

    this.props.uploadPhotosRequest(accepted, dir, colorName)
  }

  componentWillReceiveProps(nextProps) {
    const { colorName, input, photos: oldPhotos } = this.props
    const { photos: newPhotos } = nextProps

    if (
      newPhotos.colors[colorName] &&
      !isEqual(oldPhotos.colors[colorName], newPhotos.colors[colorName])
    ) {
      console.log('upload photo', colorName)
      const colorPhotos = newPhotos.colors[colorName].map(url => ({
        url
      }))
      input.onChange(colorPhotos)
    }
  }

  render() {
    return (
      <Dropzone accept="image/jpeg, image/png" onDrop={this.uploadPhotos} />
    )
  }
}

const mapStateToProps = ({ photos }) => ({
  photos
})

const mapDispatchToProps = dispatch => ({
  uploadPhotosRequest: (photos, dir, colorName) =>
    dispatch(Creators.uploadPhotosRequest(photos, dir, colorName))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadPhotos)
