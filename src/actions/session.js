// @flow
import type { TaskPlace } from '../types'
type ChangeAction = {
  type: 'SESSION__CHANGE_EDITING',
  place: TaskPlace,
  index: number,
}

export type SessionAction = ChangeAction

export const change = (place: TaskPlace, index: number) => ({
  type: 'SESSION__CHANGE_EDITING',
  place,
  index,
})
