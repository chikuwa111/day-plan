// @flow
import uuid from 'uuid/v4'
import type { Task } from '../types'

export const newTask = (): Task => ({
  id: uuid(),
  body: '',
  color: '#fafafa',
  length: 30,
})
