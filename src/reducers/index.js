// @flow
import { combineReducers } from 'redux'
import type { State } from '../types'
import type { Action } from '../actions'
import tasks from './tasks'
import setting from './setting'
import stock from './stock'
import session from './session'

const reducer: (state: State, action: Action) => State = combineReducers({
  tasks,
  setting,
  stock,
  session,
})

export default reducer
