// @flow
import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import registerServiceWorker from './lib/registerServiceWorker'
import App from './components/App'

const root = document.getElementById('root')
if (root instanceof Element) {
  const store = createStore(reducer)
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  )
  registerServiceWorker()
}
