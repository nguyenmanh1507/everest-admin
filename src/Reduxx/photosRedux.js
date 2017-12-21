import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  uploadPhotosRequest: ['photos', 'dir', 'colorName'],
  uploadPhotosSuccess: ['downloadUrl', 'colorName'],
  uploadPhotosFailure: ['error']
})

export const photosType = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  uploading: false,
  colors: {}
})

/* ------------- Reducers ------------- */

// we've attemping to upload photos
export const request = state => state.merge({ uploading: true })

// we've successfully upload photos
export const success = (state, { downloadUrl, colorName }) => {
  const oldData = state.colors[colorName] ? state.colors[colorName] : []

  return state.merge({
    colors: {
      ...state.colors,
      [colorName]: [...oldData, ...downloadUrl]
    },
    uploading: false,
    error: null
  })
}

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
