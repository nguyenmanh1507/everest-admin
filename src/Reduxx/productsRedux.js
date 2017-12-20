import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchProductsRequest: null,
  fetchProductsSuccess: ['data'],
  fetchProductsFailure: ['error']
})

export const productsType = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we've attemping to get all products
export const request = (state) => state.merge({ fetching: true })

// we've successfully get all products
export const success = (state, { data }) =>
  state.merge({
    fetching: false,
    error: null,
    data
  })

// we've had a problem get all products
export const failure = (state, { error }) =>
  state.merge({
    fetching: false,
    error
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_PRODUCTS_REQUEST]: request,
  [Types.FETCH_PRODUCTS_SUCCESS]: success,
  [Types.FETCH_PRODUCTS_FAILURE]: failure
})
