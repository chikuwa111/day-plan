// @flow
import uuid from 'uuid/v4'
import type { Action } from '../actions'
import type { StockState } from '../types'

const initialState: StockState = []

const stock = (
  stock: StockState = initialState,
  action: Action
): StockState => {
  switch (action.type) {
    case 'STOCK__ADD':
      return [
        {
          id: uuid(),
          body: '',
          color: '#fafafa',
          length: 30,
        },
        ...stock,
      ]
    case 'STOCK__UPDATE':
      return [
        ...stock.slice(0, action.index),
        action.task,
        ...stock.slice(action.index + 1),
      ]
    case 'STOCK__DESTROY':
      return [...stock.slice(0, action.index), ...stock.slice(action.index + 1)]
    default:
      return stock
  }
}

export default stock
