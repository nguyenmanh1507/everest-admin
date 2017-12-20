import { put, takeLatest, call } from 'redux-saga/effects'

import { api } from 'Services'
import Creators, { productType } from 'Reduxx/productRedux'

function* createProduct() {
  const response = yield call(api.createProduct)
  yield put(Creators.createProductSuccess)
}

export function* watchCreateProduct() {
  yield takeLatest(productsType.CREATE_PRODUCT_REQUEST, createProduct, ['data'])
}
