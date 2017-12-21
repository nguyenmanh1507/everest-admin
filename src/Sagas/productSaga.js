import { put, takeLatest, call } from 'redux-saga/effects'
import { reset } from 'redux-form'
import store from 'Reduxx'

import { api } from 'Services'
import Creators, { productType } from 'Reduxx/productRedux'

function* createProduct(action) {
  yield call(api.createProduct, action)
  yield put(Creators.createProductSuccess())
  yield put(store.dispatch(reset('addProducts')))
}

export function* watchCreateProduct() {
  yield takeLatest(productType.CREATE_PRODUCT_REQUEST, createProduct)
}
