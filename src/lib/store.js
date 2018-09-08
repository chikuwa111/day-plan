// @flow
import { applyMiddleware, createStore } from 'redux'
import reducers from '../reducers'
import gaMiddleware from '../lib/gaMiddleware'
import { storageMiddleware } from '../lib/storage'

let middleware = [gaMiddleware, storageMiddleware]
if (process.env.NODE_ENV !== 'production') {
  const logger = require('redux-logger').default
  middleware = [...middleware, logger]
}

const store = createStore(reducers, applyMiddleware(...middleware))

export default store
