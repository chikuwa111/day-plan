// @flow
import type { Task } from '../types'
type AddAction = { type: 'STOCK__ADD', task: Task }

export type StockAction = AddAction

export const add = (task: Task) => ({
  type: 'STOCK__ADD',
  task,
})
