// @flow
import nanoid from 'nanoid'
import type { Action } from '../actions'
import type { SessionState } from '../types'

const initialState: SessionState = {
  activePlanId: null,
}

const session = (
  session: SessionState = initialState,
  action: Action
): SessionState => {
  switch (action.type) {
    case 'PLAN__ADD':
      return {
        activePlanId: nanoid(7),
      }
    case 'PLAN__SWITCH':
      return {
        activePlanId: action.id,
      }
    default:
      return session
  }
}
