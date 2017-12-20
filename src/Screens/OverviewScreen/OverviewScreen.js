// @flow

import React, { Component, Fragment } from 'react'
import { truncate } from 'lodash'
import moment from 'moment'

type Props = {
  products: {
    data: Array<Object>,
    error: ?Object,
    fetching: boolean
  }
}

class OverviewScreen extends Component<Props> {
  render() {
    const { products: { data, fetching } } = this.props

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
            {fetching && (
              <tr>
                <td colSpan="5" className="text-center text-primary">
                  <i className="fa fa-spinner fa-pulse fa-3x" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

export default OverviewScreen
