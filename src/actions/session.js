// @flow
import type { EditingPlace } from '../types'
type ChangeAction = {
  type: 'SESSION__CHANGE_EDITING',
  editingPlace: EditingPlace,
  editingIndex: number,
}

export type SessionAction = ChangeAction

export const change = (editingPlace: EditingPlace, editingIndex: number) => ({
  type: 'SESSION__CHANGE_EDITING',
  editingPlace,
  editingIndex,
})
