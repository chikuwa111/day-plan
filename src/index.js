// @flow
import * as React from 'react'
import { render } from 'react-dom'
import registerServiceWorker from './lib/registerServiceWorker'
import App from './components/App'

render(<App />, document.getElementById('root'))
registerServiceWorker()
