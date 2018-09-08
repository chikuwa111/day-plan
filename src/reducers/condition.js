// @flow
import { TaskPlaces } from '../constants'
import type { Action } from '../actions'
import type { ConditionState } from '../types'

const initialState: ConditionState = {
  editing: {
    place: null,
    index: -1,
  },
  plans: [],
}

const condition = (
  condition: ConditionState = initialState,
  action: Action
): ConditionState => {
  switch (action.type) {
    case 'SESSION__CHANGE_EDITING':
      return {
        ...condition,
        editing: {
          place: action.place,
          index: action.index,
        },
      }
    case 'TASK__ADD':
      return {
        ...condition,
        editing: {
          place: TaskPlaces.TIMETABLE,
          index: action.index,
        },
      }
    case 'STOCK__ADD':
      return {
        ...condition,
        editing: {
          place: TaskPlaces.STOCK,
          index: 0,
        },
      }
    case 'TASK__MOVE':
    case 'TASK__DESTROY':
    case 'STOCK__DESTROY':
    case 'PLAN__ADD':
    case 'PLAN__SWITCH':
    case 'PLAN__DESTROY':
      return initialState
    default:
      return condition
  }
}

export default condition
