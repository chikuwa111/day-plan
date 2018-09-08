// @flow
import type { Task, TaskPlace } from '../types'

type AddAction = { type: 'TASK__ADD', index: number }
type UpdateAction = { type: 'TASK__UPDATE', index: number, task: Task }
type UpdateByIdAction = { type: 'TASK__UPDATE_BY_ID', task: Task }
type DestroyAction = { type: 'TASK__DESTROY', index: number }
type MoveAction = {
  type: 'TASK__MOVE',
  task: Task,
  from: TaskPlace,
  fromIndex: number,
  fromOffset: number,
  to: TaskPlace,
  toIndex: number,
  toOffset: number,
}

export type TaskAction =
  | AddAction
  | UpdateAction
  | UpdateByIdAction
  | DestroyAction
  | MoveAction

export const addTask = (index: number): AddAction => ({
  type: 'TASK__ADD',
  index,
})

export const updateTask = (index: number, task: Task): UpdateAction => ({
  type: 'TASK__UPDATE',
  index,
  task,
})

export const updateTaskById = (task: Task): UpdateByIdAction => ({
  type: 'TASK__UPDATE_BY_ID',
  task,
})

export const destroyTask = (index: number): DestroyAction => ({
  type: 'TASK__DESTROY',
  index,
})

export const moveTask = (
  task: Task,
  from: TaskPlace,
  fromIndex: number,
  fromOffset: number,
  to: TaskPlace,
  toIndex: number,
  toOffset: number
): MoveAction => ({
  type: 'TASK__MOVE',
  task,
  from,
  fromIndex,
  fromOffset,
  to,
  toIndex,
  toOffset,
})
