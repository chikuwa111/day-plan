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
    case 'TASKS__MOVE': {
      const taskSize = action.task.length / 30
      if (action.from === 'TimeTable' && action.to === 'TimeTable') {
        // TODO: taskの移動前後が被っているときの処理
        if (action.fromIndex <= action.toIndex) {
          return [
            ...tasks.slice(0, action.fromIndex),
            ...Array.from({ length: taskSize }, () => null),
            ...tasks.slice(action.fromIndex + 1, action.toIndex),
            action.task,
            ...tasks.slice(action.toIndex + taskSize),
          ]
        } else {
          return [
            ...tasks.slice(0, action.toIndex),
            action.task,
            ...tasks.slice(action.toIndex + taskSize, action.fromIndex),
            ...Array.from({ length: taskSize }, () => null),
            ...tasks.slice(action.fromIndex + 1),
          ]
        }
      } else if (action.from === 'TimeTable') {
        return [
          ...tasks.slice(0, action.fromIndex),
          ...Array.from({ length: taskSize }, () => null),
          ...tasks.slice(action.fromIndex + 1),
        ]
      } else if (action.to === 'TimeTable') {
        return [
          ...tasks.slice(0, action.toIndex),
          action.task,
          ...tasks.slice(action.toIndex + taskSize),
        ]
      } else {
        return tasks
      }
    }
    default:
      return tasks
  }
}

export default tasks
