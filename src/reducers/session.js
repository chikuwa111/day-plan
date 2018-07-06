// @flow
import { TaskPlaces } from '../constants'
import type { Action } from '../actions'
import type { SessionState } from '../types'

const initialState: SessionState = {
  editing: {
    place: null,
    index: -1,
  },
}

const session = (
  session: SessionState = initialState,
  action: Action
): SessionState => {
  switch (action.type) {
    case 'SESSION__CHANGE_EDITING':
      return {
        ...session,
        editing: {
          place: action.place,
          index: action.index,
        },
      }
    case 'TASKS__ADD':
      return {
        ...session,
        editing: {
          place: TaskPlaces.TIMETABLE,
          index: action.index,
        },
      }
    case 'TASKS__DESTROY':
      return initialState
    case 'STOCK__ADD':
      return {
        ...session,
        editing: {
          place: TaskPlaces.STOCK,
          index: 0,
        },
      }
    case 'STOCK__DESTROY':
      return initialState
    case 'TASKS__MOVE':
      return initialState
    default:
      return session
  }
}

export default session
