// @flow
type AddAction = { type: 'STOCK__ADD' }
type DestroyAction = { type: 'STOCK__DESTROY', index: number }

export type StockAction = AddAction | DestroyAction

export const addStock = (): AddAction => ({
  type: 'STOCK__ADD',
})

export const destroyStock = (index: number): DestroyAction => ({
  type: 'STOCK__DESTROY',
  index,
})
