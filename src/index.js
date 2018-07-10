// @flow
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import store from './lib/store'
import registerServiceWorker from './lib/registerServiceWorker'
import CircularProgress from '@material-ui/core/CircularProgress'
import App from './components/App'

const root = document.getElementById('root')
if (root instanceof Element) {
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
