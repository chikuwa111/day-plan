// @flow
import type { Task, TaskPlace } from '../types'

type AddAction = { type: 'STOCK__ADD' }
type UpdateAction = { type: 'STOCK__UPDATE', index: number, task: Task }
type DestroyAction = { type: 'STOCK__DESTROY', index: number }
type MoveAction = {
  type: 'STOCK__MOVE',
  task: Task,
  from: TaskPlace,
  fromIndex: number,
  toIndex: number,
}

export type StockAction = AddAction | UpdateAction | DestroyAction | MoveAction

export const add = () => ({
  type: 'STOCK__ADD',
})

export const update = (index: number, task: Task) => ({
  type: 'STOCK__UPDATE',
  index,
  task,
})

export const destroy = (index: number) => ({
  type: 'STOCK__DESTROY',
  index,
})

export const move = (
  task: Task,
  from: TaskPlace,
  fromIndex: number,
  toIndex: number
) => ({
  type: 'STOCK__MOVE',
  task,
  from,
  fromIndex,
  toIndex,
})
