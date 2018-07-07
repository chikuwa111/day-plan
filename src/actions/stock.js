// @flow
import type { Task } from '../types'

type AddAction = { type: 'STOCK__ADD' }
type UpdateAction = { type: 'STOCK__UPDATE', index: number, task: Task }
type DestroyAction = { type: 'STOCK__DESTROY', index: number }

export type StockAction = AddAction | UpdateAction | DestroyAction

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
