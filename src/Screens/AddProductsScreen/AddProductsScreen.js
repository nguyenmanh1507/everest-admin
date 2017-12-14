// @flow

import React, { Component, Fragment } from 'react'
import firebase from 'firebase'

import AddProductsFom from './AddProductsFom'
import { db } from 'FirebaseConfig'

const productsTestRef = db.collection('productsTest')

function logError(error) {
  console.error('Error happen:', error)
}

class AddProductsScreen extends Component<{}> {
  showResults = (values: Object) => {
    productsTestRef
      .add({
        ...values,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
        console.info('Add products success:', docRef.id)
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
