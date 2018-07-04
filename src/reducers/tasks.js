// @flow
import type { Action } from '../actions'
import type { TasksState } from '../types'

const initialState: TasksState = Array.from({ length: 24 }, () => null)

const tasks = (
  tasks: TasksState = initialState,
  action: Action
): TasksState => {
  switch (action.type) {
    default:
      return tasks
  }
}

export default tasks
