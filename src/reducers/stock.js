// @flow
import type { Action } from '../actions'
import type { StockState } from '../types'

const initialState: StockState = []

const stock = (
  stock: StockState = initialState,
  action: Action
): StockState => {
  switch (action.type) {
    case 'STOCK__ADD':
      return [action.task, ...stock]
    default:
      return stock
  }
}

export default stock
