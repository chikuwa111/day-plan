// @flow
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './lib/store'
import registerServiceWorker from './lib/registerServiceWorker'
import App from './containers/App'

const root = document.getElementById('root')
if (root instanceof Element) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  )
  registerServiceWorker()
}
