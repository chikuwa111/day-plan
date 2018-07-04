// @flow
import type { Task } from '../types'

type AddAction = { type: 'TASKS__ADD', index: number }
type UpdateAction = { type: 'TASKS__UPDATE', index: number, task: Task }
type DestroyAction = { type: 'TASKS__DESTROY', index: number }

export type TasksAction = AddAction | UpdateAction | DestroyAction

export const add = (index: number) => ({
  type: 'TASKS__ADD',
  index,
})

export const update = (index: number, task: Task) => ({
  type: 'TASKS__UPDATE',
  index,
  task,
})

export const destroy = (index: number) => ({
  type: 'TASKS__DESTROY',
  index,
})
