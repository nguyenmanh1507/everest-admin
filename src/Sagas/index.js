import { all, fork } from 'redux-saga/effects'

import { watchFetchProducts } from './productsSaga'
import { watchCreateProduct } from './productSaga'
import { watchUploadPhotos } from './photosSaga'

export default function* rootSaga() {
  yield all([
    fork(watchFetchProducts),
    fork(watchCreateProduct),
    fork(watchUploadPhotos)
  ])
}
