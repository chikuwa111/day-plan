// @flow
import { combineReducers } from 'redux'
import type { State } from '../types'
import type { Action } from '../actions'
import condition from './condition'
import session from './session'
import stock from './stock'
import plan from './plan'

const reducer: (state: State, action: Action) => State = combineReducers({
  condition,
  session,
  stock,
  plan,
})

export default reducer
