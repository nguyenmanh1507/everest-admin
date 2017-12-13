// @flow

import * as React from 'react'
import firebase from 'firebase'

import { db } from 'FirebaseConfig'

const productsTestRef = db.collection('productsTest')

function logError(error) {
  console.error('Error happen:', error)
}

type Props = {
  render: ({
    handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => void
  }) => React.Node
}

class AddProductsFormManager extends React.Component<Props> {
  showResults = values => {
    console.log(values)
  }

  render() {
    const { render } = this.props
    return (
      <React.Fragment>
        {render({
          showResults: this.showResults
        })}
      </React.Fragment>
    )
  }
}

export default AddProductsFormManager
