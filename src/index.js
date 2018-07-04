// @flow
import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import reducer from './reducers'
import registerServiceWorker from './lib/registerServiceWorker'
import App from './components/App'

const root = document.getElementById('root')
if (root instanceof Element) {
  const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, reducer)
  const store = createStore(persistedReducer)
  const persistor = persistStore(store)
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    root
  )
  registerServiceWorker()
}
