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
    case 'TASKS__UPDATE': {
      const task = tasks[action.index]
      if (task == null) {
        console.error('Unexpected TASKS_UPDATE')
        return tasks
      }
      const lengthDiffSize = (action.task.length - task.length) / 30
      if (lengthDiffSize >= 0) {
        return [
          ...tasks.slice(0, action.index),
          action.task,
          ...tasks.slice(action.index + lengthDiffSize + 1),
        ]
      } else {
        return [
          ...tasks.slice(0, action.index),
          action.task,
          ...Array.from({ length: -1 * lengthDiffSize }, () => null),
          ...tasks.slice(action.index + 1),
        ]
      }
    }
    case 'TASKS__DESTROY': {
      const task = tasks[action.index]
      if (task == null) {
        console.error('Unexpected TASKS__DESTROY')
        return tasks
      }
      const destroySize = task.length / 30
      return [
        ...tasks.slice(0, action.index),
        ...Array.from({ length: destroySize }, () => null),
        ...tasks.slice(action.index + 1),
      ]
    }
    default:
      return tasks
  }
}

export default tasks
