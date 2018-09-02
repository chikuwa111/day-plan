// @flow
import type { TaskPlace } from '../types'
type ChangeAction = {
  type: 'SESSION__CHANGE_EDITING',
  place: TaskPlace,
  index: number,
}

export type SessionAction = ChangeAction

export const changeEditing = (
  place: TaskPlace,
  index: number
): ChangeAction => ({
  type: 'SESSION__CHANGE_EDITING',
  place,
  index,
})
