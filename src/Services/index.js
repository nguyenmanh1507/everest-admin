// @flow

import { db } from 'FirebaseConfig'
import { storage } from 'FirebaseConfig'
import uuidv1 from 'uuid/v1'
import firebase from 'firebase'
// import { filter } from 'lodash'

const productsRef = db.collection('products')

export const api = {
  fetchProducts() {
    return productsRef
      .orderBy('timestamp', 'desc')
      .get()
      .then(snapshot => {
        let data = []
        snapshot.forEach(
          doc => (data = [...data, { id: doc.id, ...doc.data() }])
        )
        return data
      })
    // .onSnapshot(
    //   snapshot => {
    //     if (!snapshot.metadata.hasPendingWrites) {
    //       let newData = []

    //       snapshot.docChanges.forEach(change => {
    //         if (change.type === 'added') {
    //           newData = [
    //             { id: change.doc.id, ...change.doc.data() },
    //             ...newData
    //           ]
    //         }

    //         if (change.type === 'modified') {
    //           newData = products.data.map(d => {
    //             if (d.id === change.doc.id) {
    //               return {
    //                 id: change.doc.id,
    //                 ...change.doc.data()
    //               }
    //             }

    //             return d
    //           })
    //         }

    //         if (change.type === 'removed') {
    //           newData = filter(products.data, d => d.id !== change.doc.id)
    //         }
    //       })

    //       console.log('api', newData)

    //       return newData
    //     }
    //   },
    //   error => {
    //     throw Error(`Get products error: ${error}`)
    //   }
    // )
  },
  createProduct(action: Object) {
    const { colors, ...documentData } = action.data

    productsRef
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
      .catch(error => {
        throw Error(error)
      })
  },
  uploadPhotos(action: { photos: Array<Object>, dir: string }): Promise<any> {
    const { photos, dir } = action
    const productPhotosRef = storage.ref(`products/${dir}`)

    return Promise.all(
      photos.map(photo => {
        return productPhotosRef
          .child(uuidv1())
          .put(photo)
          .then(snapshot => {
            return snapshot.downloadURL
          })
          .catch(error => {
            throw Error(error)
          })
      })
    ).then(downloadURL => downloadURL)
  }
}
