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

export const calcFromOffset = (
  initialOffset: ?{ x: number, y: number },
  initialSourceOffset: ?{ x: number, y: number }
) => {
  // ドラッグ位置からタスクのどの部分をドラッグ中か求める関数
  // 0-30minなら0, 30-60minなら1, ...を返す

  // Taskは30minで32px (16px * 2rem)
  // 16pxはindex.htmlのcssで指定している
  // サイズの変更があった場合はこれも対応させる必要あり
  const PX_HEIGHT_FOR_30MIN = 32

  if (initialOffset == null || initialSourceOffset == null) return 0

  const dragYPositionFromTop = initialOffset.y - initialSourceOffset.y
  return Math.floor(dragYPositionFromTop / PX_HEIGHT_FOR_30MIN)
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
    const dropTargets = tasks.slice(
      toIndex - fromOffset,
      toIndex - fromOffset + taskSize
    )
    return (
      dropTargets.length >= taskSize && dropTargets.every(task => task == null)
    )
  }
  if (from === TaskPlaces.TIMETABLE && to === TaskPlaces.TIMETABLE) {
    const taskSize = task.length / 30
    const moveDiff =
      fromIndex < toIndex
        ? fromIndex - toOffset - (taskSize - 1) - (toIndex - fromOffset)
        : fromIndex - toOffset - (toIndex - fromOffset)
    const moveSize = Math.abs(moveDiff)
    if (moveSize < taskSize) {
      // ドラッグしたTaskとドロップしたTaskが被っている
      if (moveDiff <= 0) {
        // 完全に被っているかドロップしたTaskの方が下
        const dropTargets = tasks.slice(fromIndex + 1, fromIndex + 1 + moveSize)
        return (
          dropTargets.length >= moveSize &&
          dropTargets.every(task => task == null)
        )
      }
      // ドロップしたTaskの方が上
      const dropTargets = tasks.slice(fromIndex - moveSize, fromIndex)
      return (
        dropTargets.length >= moveSize &&
        dropTargets.every(task => task == null)
      )
    }
    // ドラッグしたTaskとドロップしたTaskが被っていない
    const dropTargets = tasks.slice(
      toIndex - fromOffset,
      toIndex - fromOffset + taskSize
    )
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
    const moveDiff =
      fromIndex < toIndex
        ? fromIndex - toOffset - (taskSize - 1) - (toIndex - fromOffset)
        : fromIndex - toOffset - (toIndex - fromOffset)
    const moveSize = Math.abs(moveDiff)
    if (moveSize < taskSize) {
      if (moveDiff <= 0) {
        return [
          ...tasks.slice(0, fromIndex),
          ...newEmptyTasks(moveSize),
          task,
          ...tasks.slice(fromIndex + 1 + moveSize),
        ]
      }
      return [
        ...tasks.slice(0, fromIndex - moveSize),
        task,
        ...newEmptyTasks(moveSize),
        ...tasks.slice(fromIndex + 1),
      ]
    }
    if (fromIndex < toIndex) {
      return [
        ...tasks.slice(0, fromIndex),
        ...newEmptyTasks(taskSize),
        ...tasks.slice(fromIndex + 1, toIndex - fromOffset),
        task,
        ...tasks.slice(toIndex - fromOffset + taskSize),
      ]
    }
    return [
      ...tasks.slice(0, toIndex - fromOffset),
      task,
      ...tasks.slice(toIndex - fromOffset + taskSize, fromIndex),
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
      ...tasks.slice(0, toIndex - fromOffset),
      task,
      ...tasks.slice(toIndex - fromOffset + taskSize),
    ]
  }
  return tasks
}
