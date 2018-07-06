// @flow
import { newTask } from '../lib/task'
import { TaskPlaces } from '../constants'
import type { Action } from '../actions'
import type { StockState } from '../types'

const initialState: StockState = []

const stock = (
  stock: StockState = initialState,
  action: Action
): StockState => {
  switch (action.type) {
    case 'STOCK__ADD':
      return [newTask(), ...stock]
    case 'STOCK__UPDATE':
      return [
        ...stock.slice(0, action.index),
        action.task,
        ...stock.slice(action.index + 1),
      ]
    case 'STOCK__DESTROY':
      return [...stock.slice(0, action.index), ...stock.slice(action.index + 1)]
    case 'STOCK__MOVE':
      if (action.from === TaskPlaces.STOCK) {
        return [
          action.task,
          ...stock.slice(0, action.fromIndex),
          ...stock.slice(action.fromIndex + 1),
        ]
      }
      return [action.task, ...stock]
    case 'TASKS__MOVE':
      if (action.from === TaskPlaces.STOCK) {
        return [
          ...stock.slice(0, action.fromIndex),
          ...stock.slice(action.fromIndex + 1),
        ]
      }
      return stock
    default:
      return stock
  }
}

export default stock
