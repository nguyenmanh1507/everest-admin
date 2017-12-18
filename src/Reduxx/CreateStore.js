import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// creates the store
export default rootReducer => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(createSagaMiddleware))
  )
}
