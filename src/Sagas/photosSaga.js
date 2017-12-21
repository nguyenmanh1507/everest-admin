import { put, takeLatest, call } from 'redux-saga/effects'

import { api } from 'Services'
import Creators, { photosType } from 'Reduxx/photosRedux'

function* uploadPhotos(action) {
  const response = yield call(api.uploadPhotos, action)
  yield put(Creators.uploadPhotosSuccess(response, action.colorName))
}

export function* watchUploadPhotos() {
  yield takeLatest(photosType.UPLOAD_PHOTOS_REQUEST, uploadPhotos)
}
