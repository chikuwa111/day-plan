// @flow
import { TaskPlaces } from '../constants'
import type { Action } from '../actions'
import type { ConditionState } from '../types'

const initialState: ConditionState = {
  loading: true,
  editing: {
    place: null,
    index: -1,
  },
  planList: [],
}

const condition = (
  condition: ConditionState = initialState,
  action: Action
): ConditionState => {
  switch (action.type) {
    case 'INIT':
      return {
        ...condition,
        loading: false,
      }
    case 'CONDITION__UPDATE_LOADING':
      return {
        ...condition,
        loading: action.loading,
      }
    case 'CONDITION__UPDATE_PLAN_LIST':
      return {
        ...condition,
        planList: action.planList,
      }
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
      return {
        ...condition,
        editing: initialState.editing,
      }
    case 'PLAN__SWITCH':
    case 'PLAN__DESTROY':
      return {
        ...condition,
        loading: false,
        editing: initialState.editing,
      }
    default:
      return condition
  }
}

export default condition
