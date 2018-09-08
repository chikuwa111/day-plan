// @flow
import type { Task } from '../types'

type AddAction = { type: 'STOCK__ADD' }
type UpdateAction = { type: 'STOCK__UPDATE', index: number, task: Task }
type UpdateByIdAction = { type: 'STOCK__UPDATE_BY_ID', task: Task }
type DestroyAction = { type: 'STOCK__DESTROY', index: number }

export type StockAction =
  | AddAction
  | UpdateAction
  | UpdateByIdAction
  | DestroyAction

export const addStock = (): AddAction => ({
  type: 'STOCK__ADD',
})

export const updateStock = (index: number, task: Task): UpdateAction => ({
  type: 'STOCK__UPDATE',
  index,
  task,
})

export const updateByIdStock = (task: Task): UpdateByIdAction => ({
  type: 'STOCK__UPDATE_BY_ID',
  task,
})

export const destroyStock = (index: number): DestroyAction => ({
  type: 'STOCK__DESTROY',
  index,
})
