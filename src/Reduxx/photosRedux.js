import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  uploadPhotoRequest: ['photo'],
  uploadPhotoSuccess: ['data'],
  uploadPhotoFailure: ['error']
})

export const photosType = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  error: null,
  uploading: false
})

/* ------------- Reducers ------------- */

// we've attemping to upload photos
export const request = state => state.merge({ uploading: true })

// we've successfully upload photos
export const success = (state, { data }) =>
  state.merge({
    data,
    uploading: false,
    error: null
  })

// we've had a problem upload photos
export const failure = (state, { error }) =>
  state.merge({
    uploading: false,
    error
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPLOAD_PHOTOS_REQUEST]: request,
  [Types.UPLOAD_PHOTOS_SUCCESS]: success,
  [Types.UPLOAD_PHOTOS_FAILURE]: failure
})
