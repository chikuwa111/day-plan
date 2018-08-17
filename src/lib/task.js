// @flow
import nanoid from 'nanoid'
import { TaskPlaces } from '../constants'
import type { Plan, Task, TaskPlace } from '../types'

export const newTask = (): Task => ({
  id: nanoid(7),
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

export const canMove = (
  tasks: Array<?Task>,
  task: Task,
  from: TaskPlace,
  fromIndex: number,
  fromOffset: number, // Taskのどの部分をドラッグしているか(0-30minのところをドラッグしていれば0)
  to: TaskPlace,
  toIndex: number,
  toOffset: number // ドラッグしたTask上にドロップしようとしている場合、どの部分にドロップしようとしているか(0-30minのところをドラッグしていれば0)
): boolean => {
  if (from === TaskPlaces.STOCK && to === TaskPlaces.STOCK) {
    return false
  }
  if (from === TaskPlaces.TIMETABLE && to === TaskPlaces.STOCK) {
    return true
  }
  if (from === TaskPlaces.STOCK && to === TaskPlaces.TIMETABLE) {
    const taskSize = task.length / 30
    const dropTargets = tasks.slice(toIndex, toIndex + taskSize)
    return (
      dropTargets.length >= taskSize && dropTargets.every(task => task == null)
    )
  }
  if (from === TaskPlaces.TIMETABLE && to === TaskPlaces.TIMETABLE) {
    const taskSize = task.length / 30
    if (fromIndex === toIndex) {
      const dropTargets = tasks.slice(toIndex + 1, toIndex + 1 + toOffset)
      return (
        dropTargets.length >= toOffset &&
        dropTargets.every(task => task == null)
      )
    }
    const moveSize = Math.abs(toIndex - fromIndex)
    if (toIndex < fromIndex && moveSize < taskSize) {
      const dropTargets = tasks.slice(toIndex, fromIndex)
      return dropTargets.every(task => task == null)
    }
    const dropTargets = tasks.slice(toIndex, toIndex + taskSize)
    return (
      dropTargets.length >= taskSize && dropTargets.every(task => task == null)
    )
  }
  return false
}

export const move = (
  tasks: Array<?Task>,
  task: Task,
  from: TaskPlace,
  fromIndex: number,
  fromOffset: number, // Taskのどの部分をドラッグしているか(0-30minのところをドラッグしていれば0)
  to: TaskPlace,
  toIndex: number,
  toOffset: number // ドラッグしたTask上にドロップしようとしている場合、どの部分にドロップしようとしているか(0-30minのところをドラッグしていれば0)
): Array<?Task> => {
  const taskSize = task.length / 30
  if (from === TaskPlaces.TIMETABLE && to === TaskPlaces.TIMETABLE) {
    if (fromIndex === toIndex) {
      return [
        ...tasks.slice(0, fromIndex),
        ...newEmptyTasks(toOffset),
        task,
        ...tasks.slice(toIndex + 1 + toOffset),
      ]
    }
    if (fromIndex < toIndex) {
      return [
        ...tasks.slice(0, fromIndex),
        ...newEmptyTasks(taskSize),
        ...tasks.slice(fromIndex + 1, toIndex),
        task,
        ...tasks.slice(toIndex + taskSize),
      ]
    }
    const moveSize = Math.abs(fromIndex - toIndex)
    if (moveSize < taskSize) {
      return [
        ...tasks.slice(0, toIndex),
        task,
        ...newEmptyTasks(moveSize),
        ...tasks.slice(fromIndex + 1),
      ]
    }
    return [
      ...tasks.slice(0, toIndex),
      task,
      ...tasks.slice(toIndex + taskSize, fromIndex),
      ...newEmptyTasks(taskSize),
      ...tasks.slice(fromIndex + 1),
    ]
  }
  if (from === TaskPlaces.TIMETABLE) {
    return [
      ...tasks.slice(0, fromIndex),
      ...newEmptyTasks(taskSize),
      ...tasks.slice(fromIndex + 1),
    ]
  }
  if (to === TaskPlaces.TIMETABLE) {
    return [
      ...tasks.slice(0, toIndex),
      task,
      ...tasks.slice(toIndex + taskSize),
    ]
  }
  return tasks
}
