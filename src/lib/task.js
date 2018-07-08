// @flow
import uuid from 'uuid/v4'
import type { Task } from '../types'

export const newTask = (): Task => ({
  id: uuid(),
  body: '',
  color: '#fafafa',
  length: 30,
})

export const newEmptyTasks = (length: number): Array<?Task> =>
  Array.from({ length }, () => null)
