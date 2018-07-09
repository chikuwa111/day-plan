// @flow
import * as React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import logger from 'redux-logger'
import reducer from './reducers'
import registerServiceWorker from './lib/registerServiceWorker'
import CircularProgress from '@material-ui/core/CircularProgress'
import App from './components/App'

const root = document.getElementById('root')
if (root instanceof Element) {
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['session'],
  }
  const persistedReducer = persistReducer(persistConfig, reducer)
  const store = createStore(persistedReducer, applyMiddleware(logger))
  const persistor = persistStore(store)

  render(
    <Provider store={store}>
      <PersistGate loading={<CircularProgress />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    root
  )
  registerServiceWorker()
}
