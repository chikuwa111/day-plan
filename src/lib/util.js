// @flow
import uuid from 'uuid/v4'
import type { Plan, Task } from '../types'

export const newTask = (): Task => ({
  id: uuid(),
  body: '',
  color: '#fafafa',
  length: 30,
})

export const newEmptyTasks = (length: number): Array<?Task> =>
  Array.from({ length }, () => null)

export const newPlan = (): Plan => ({
  title: getTodayStr(),
  start: 8,
  end: 23,
  tasks: newEmptyTasks(30),
})

export const getTodayStr = (): string => {
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const date = ('0' + today.getDate()).slice(-2)
  return `${year}-${month}-${date}`
}
