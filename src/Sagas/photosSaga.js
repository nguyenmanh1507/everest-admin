import { put, takeLatest, call } from 'redux-saga/effects'

import { api } from 'Services'
import Creators, { photosType } from 'Reduxx/photosRedux'

function* uploadPhotos() {
  const response = yield call(api.uploadPhotos)
  yield put(Creators.uploadPhotosSuccess(response))
}

export function* watchUploadPhotos() {
  yield takeLatest(photosType.UPLOAD_PHOTOS_REQUEST, uploadPhotos)
}
