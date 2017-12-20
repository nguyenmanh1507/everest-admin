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
  data: [],
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we've attemping to create product
export const request = state => state.merge({ fetching: true })

// we've successfully create product
export const success = state =>
  state.merge({
    fetching: false,
    error: null
  })

// we've had a problem create product
export const failure = (state, { error }) =>
  state.merge({
    fetching: false,
    error
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_PRODUCT_REQUEST]: request,
  [Types.CREATE_PRODUCT_SUCCESS]: success,
  [Types.CREATE_PRODUCT_FAILURE]: failure
})
