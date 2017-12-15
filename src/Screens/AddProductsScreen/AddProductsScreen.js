// @flow

import React, { Component, Fragment } from 'react'
import firebase from 'firebase'
import { reset } from 'redux-form'
import store from 'Reduxx'

import AddProductsFom from './AddProductsFom'
import { db } from 'FirebaseConfig'

const productsTestRef = db.collection('products')

function logError(error) {
  console.error('Error happen:', error)
}

class AddProductsScreen extends Component<{}> {
  showResults = (values: Object) => {
    console.log(values)
    const { colors, ...documentData } = values
    productsTestRef
      .add({
        ...documentData,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
        colors.forEach(color => {
          docRef
            .collection('colors')
            .add(color)
            .then(colorRef => {
              console.info('Add colors subcollection success:', colorRef.id)
            })
        })
        console.info('Add products success:', docRef.id)
      })
      .then(() => {
        store.dispatch(reset('addProducts'))
      })
      .catch(logError)
  }

  render() {
    return (
      <Fragment>
        <h1>Add Products</h1>
        <AddProductsFom onSubmit={this.showResults} />
      </Fragment>
    )
  }
}

export default AddProductsScreen
