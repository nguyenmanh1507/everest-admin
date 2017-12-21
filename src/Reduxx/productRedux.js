import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createProductRequest: ['data'],
  createProductSuccess: null,
  createProductFailure: ['error']
})

export const productType = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  submiting: false
})

/* ------------- Reducers ------------- */

// we've attemping to create product
export const request = state => state.merge({ submiting: true })

// we've successfully create product
export const success = state =>
  state.merge({
    error: null,
    submiting: false
  })

// we've had a problem create product
export const failure = (state, { error }) =>
  state.merge({
    error,
    submiting: false
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_PRODUCT_REQUEST]: request,
  [Types.CREATE_PRODUCT_SUCCESS]: success,
  [Types.CREATE_PRODUCT_FAILURE]: failure
})
