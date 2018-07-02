// @flow
import * as React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './lib/registerServiceWorker'
import App from './components/App'

const root = document.getElementById('root')
if (root instanceof Element) {
  render(<App />, root)
  registerServiceWorker()
}
