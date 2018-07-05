// @flow
import type { Action } from '../actions'
import type { SessionState } from '../types'

const initialState: SessionState = {
  editingPlace: null,
  editingIndex: 999,
}

const session = (
  session: SessionState = initialState,
  action: Action
): SessionState => {
  switch (action.type) {
    case 'SESSION__CHANGE_EDITING':
      return {
        ...session,
        editingPlace: action.editingPlace,
        editingIndex: action.editingIndex,
      }
    case 'TASKS__ADD':
      return {
        ...session,
        editingPlace: 'TimeTable',
        editingIndex: action.index,
      }
    case 'TASKS__DESTROY':
      return initialState
    case 'STOCK__ADD':
      return {
        ...session,
        editingPlace: 'Stock',
        editingIndex: 0,
      }
    case 'STOCK__DESTROY':
      return initialState
    case 'TASKS__MOVE':
      return {
        ...session,
        editingPlace: action.to,
        editingIndex: action.toIndex,
      }
    default:
      return session
  }
}

export default session
