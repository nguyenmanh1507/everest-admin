import { put, takeLatest, call } from 'redux-saga/effects'

import { api } from 'Services'
import Creators, { productsType } from 'Reduxx/productsRedux'

function* fetchProducts() {
  const response = yield call(api.fetchProducts)
  yield put(Creators.fetchProductsSuccess(response))
}

export function* watchFetchProducts() {
  yield takeLatest(productsType.FETCH_PRODUCTS_REQUEST, fetchProducts)
}
