// @flow
import type { Task, TaskPlace } from '../types'

type AddAction = { type: 'TASKS__ADD', index: number }
type UpdateAction = { type: 'TASKS__UPDATE', index: number, task: Task }
type DestroyAction = { type: 'TASKS__DESTROY', index: number }
type MoveAction = {
  type: 'TASKS__MOVE',
  task: Task,
  from: TaskPlace,
  fromIndex: number,
  toIndex: number,
}

export type TasksAction = AddAction | UpdateAction | DestroyAction | MoveAction

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

export const move = (
  task: Task,
  from: TaskPlace,
  fromIndex: number,
  toIndex: number
) => ({
  type: 'TASKS__MOVE',
  task,
  from,
  fromIndex,
  toIndex,
})
