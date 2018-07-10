// @flow
import { applyMiddleware, createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import reducers from '../reducers'
import gaMiddleware from '../lib/redux-beacon'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['session'],
}
const persistedReducer = persistReducer(persistConfig, reducers)

let middleware = [gaMiddleware]
if (process.env.NODE_ENV === 'production') {
  const logger = require('redux-logger')
  middleware = [...middleware, logger]
}

const store = createStore(persistedReducer, applyMiddleware(...middleware))

export default store