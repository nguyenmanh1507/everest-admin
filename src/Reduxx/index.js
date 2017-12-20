// @flow

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import configureStore from './CreateStore'

const createStore = () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    products: require('./productsRedux').reducer,
    product: require('./productRedux').reducer,
    photos: require('./photosRedux').reducer,
    form: formReducer
  })

  return configureStore(rootReducer)
}

export default createStore()
