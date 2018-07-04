// @flow
import { combineReducers } from 'redux'
import type { State } from '../types'
import type { Action } from '../actions'
import tasks from './tasks'
import setting from './setting'
import form from './form'
import stock from './stock'

const reducer: (state: State, action: Action) => State = combineReducers({
  tasks,
  setting,
  form,
  stock,
})

export default reducer
