// @flow
import { combineReducers } from 'redux'
import type { State } from '../types'
import type { Action } from '../actions'
import tasks from './tasks'
import setting from './setting'
import stock from './stock'

const reducer: (state: State, action: Action) => State = combineReducers({
  tasks,
  setting,
  stock,
})

export default reducer
