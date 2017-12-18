// @flow

import React, { Component, Fragment } from 'react'
import { truncate, filter } from 'lodash'
import moment from 'moment'

import { db } from 'FirebaseConfig'

type State = {
  data: Array<Object>
}

class OverviewScreen extends Component<{}, State> {
  state = {
    data: []
  }

  unsubscribeDataChange = null

  getProducts = () => {
    this.unsubscribeDataChange = db
      .collection('products')
      .orderBy('timestamp', 'asc')
      .onSnapshot(
        snapshot => {
          if (!snapshot.metadata.hasPendingWrites) {
            let newData = []

            snapshot.docChanges.forEach(change => {
              if (change.type === 'added') {
                newData = [
                  { id: change.doc.id, ...change.doc.data() },
                  ...newData
                ]
              }

              if (change.type === 'modified') {
                newData = this.state.data.map(d => {
                  if (d.id === change.doc.id) {
                    return {
                      id: change.doc.id,
                      ...change.doc.data()
                    }
                  }

                  return d
                })
              }

              if (change.type === 'removed') {
                newData = filter(this.state.data, d => d.id !== change.doc.id)
              }
            })
            this.setState(({ data }) => ({
              data: [...newData]
            }))
          }
        },
        error => {
          throw Error(`Get products error: ${error}`)
        }
      )
  }

  componentDidMount() {
    this.getProducts()
  }

  componentWillUnmount() {
    if (this.unsubscribeDataChange) {
      this.unsubscribeDataChange()
      console.log('unscrible data change')
    }
  }

  render() {
    const { data } = this.state

    return (
      <Fragment>
        <h1>Overview</h1>
        <table className="table bg-white">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Creat/Update</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => (
              <tr key={d.id} className="small">
                <th scope="row">{index + 1}</th>
                <td>{truncate(d.name, { length: 20, seperator: /,? +/ })}</td>
                <td>
                  {truncate(d.description, { length: 40, seperator: /,? +/ })}
                </td>
                <td>{d.price}</td>
                <td>{moment(d.timestamp).fromNow()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

export default OverviewScreen
