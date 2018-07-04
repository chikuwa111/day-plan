// @flow
import type { Task } from '../types'
type ChangeAction = { type: 'FORM__CHANGE', task: Task }

export type FormAction = ChangeAction

export const change = (task: Task) => ({
  type: 'FORM__CHANGE',
  task,
})
