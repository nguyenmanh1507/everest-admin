// @flow
import { db } from 'FirebaseConfig'
// import { filter } from 'lodash'

export const api = {
  fetchProducts() {
    return db
      .collection('products')
      .orderBy('timestamp', 'asc')
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
  }
}
