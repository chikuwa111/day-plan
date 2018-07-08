// @flow
import { combineReducers } from 'redux'
import type { State } from '../types'
import type { Action } from '../actions'
import plans from './plans'
import stock from './stock'
import session from './session'

const reducer: (state: State, action: Action) => State = combineReducers({
  plans,
  stock,
  session,
})

export default reducer
