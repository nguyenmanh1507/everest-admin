import { all, fork } from 'redux-saga/effects'

import { watchFetchProducts } from './productsSaga'

export default function* rootSaga() {
  yield all([fork(watchFetchProducts)])
}
