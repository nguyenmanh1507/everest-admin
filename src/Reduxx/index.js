// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'

const createStore = () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer
  })

  return configureStore(rootReducer)
}

export default createStore()
