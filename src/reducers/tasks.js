// @flow
import uuid from 'uuid/v4'
import type { Action } from '../actions'
import type { TasksState } from '../types'

const initialState: TasksState = Array.from({ length: 24 }, () => null)

const tasks = (
  tasks: TasksState = initialState,
  action: Action
): TasksState => {
  switch (action.type) {
    case 'TASKS__ADD':
      return [
        ...tasks.slice(0, action.index),
        { id: uuid(), body: '', color: '#fafafa', length: 30 },
        ...tasks.slice(action.index + 1),
      ]
    default:
      return tasks
  }
}

export default tasks
