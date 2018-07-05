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
    default:
      return session
  }
}

export default session
