// @flow
import { newTask } from '../lib/task'
import { TaskPlaces } from '../constants'
import type { Action } from '../actions'
import type { PlansState, Plan, Task } from '../types'

const initialState: PlansState = {
  active: 0,
  plans: [
    {
      title: 'No Title',
      begin: 8,
      end: 23,
      tasks: Array.from({ length: 30 }, () => null),
    },
  ],
}

const plans = (
  plans: PlansState = initialState,
  action: Action
): PlansState => {
  const plan = plans.plans[plans.active]
  const tasks = plan.tasks
  switch (action.type) {
    case 'PLAN__ADD':
      return {
        ...plans,
        active: 0,
        plans: [...initialState.plans, ...plans.plans],
      }
    case 'PLAN__SWITCH':
      return {
        ...plans,
        active: action.index,
      }
    case 'PLAN__UPDATE_TITLE':
      return updateActivePlan(plans, {
        ...plan,
        title: action.title,
      })
    case 'PLAN__UPDATE_TIME':
      return updateActivePlan(plans, {
        ...plan,
        [action.name]: action.time,
      })
    case 'TASK__ADD':
      return updateActivePlanTasks(plans, [
        ...tasks.slice(0, action.index),
        newTask(),
        ...tasks.slice(action.index + 1),
      ])
    case 'TASK__UPDATE': {
      const task = tasks[action.index]
      if (task == null) {
        console.error('Unexpected TASKS_UPDATE')
        return plans
      }
      const lengthDiffSize = (action.task.length - task.length) / 30
      if (lengthDiffSize >= 0) {
        return updateActivePlanTasks(plans, [
          ...tasks.slice(0, action.index),
          action.task,
          ...tasks.slice(action.index + lengthDiffSize + 1),
        ])
      } else {
        return updateActivePlanTasks(plans, [
          ...tasks.slice(0, action.index),
          action.task,
          ...Array.from({ length: -1 * lengthDiffSize }, () => null),
          ...tasks.slice(action.index + 1),
        ])
      }
    }
    case 'TASK__DESTROY': {
      const task = tasks[action.index]
      if (task == null) {
        console.error('Unexpected TASKS__DESTROY')
        return plans
      }
      const destroySize = task.length / 30
      return updateActivePlanTasks(plans, [
        ...tasks.slice(0, action.index),
        ...Array.from({ length: destroySize }, () => null),
        ...tasks.slice(action.index + 1),
      ])
    }
    case 'TASK__MOVE': {
      const taskSize = action.task.length / 30
      if (
        action.from === TaskPlaces.TIMETABLE &&
        action.to === TaskPlaces.TIMETABLE
      ) {
        if (action.fromIndex === action.toIndex) {
          return updateActivePlanTasks(plans, [
            ...tasks.slice(0, action.fromIndex),
            ...Array.from({ length: action.offset }, () => null),
            action.task,
            ...tasks.slice(action.toIndex + 1 + action.offset),
          ])
        }
        if (action.fromIndex < action.toIndex) {
          return updateActivePlanTasks(plans, [
            ...tasks.slice(0, action.fromIndex),
            ...Array.from({ length: taskSize }, () => null),
            ...tasks.slice(action.fromIndex + 1, action.toIndex),
            action.task,
            ...tasks.slice(action.toIndex + taskSize),
          ])
        }
        const moveSize = Math.abs(action.fromIndex - action.toIndex)
        if (moveSize < taskSize) {
          return updateActivePlanTasks(plans, [
            ...tasks.slice(0, action.toIndex),
            action.task,
            ...Array.from({ length: moveSize }, () => null),
            ...tasks.slice(action.fromIndex + 1),
          ])
        }
        return updateActivePlanTasks(plans, [
          ...tasks.slice(0, action.toIndex),
          action.task,
          ...tasks.slice(action.toIndex + taskSize, action.fromIndex),
          ...Array.from({ length: taskSize }, () => null),
          ...tasks.slice(action.fromIndex + 1),
        ])
      }
      if (action.from === TaskPlaces.TIMETABLE) {
        return updateActivePlanTasks(plans, [
          ...tasks.slice(0, action.fromIndex),
          ...Array.from({ length: taskSize }, () => null),
          ...tasks.slice(action.fromIndex + 1),
        ])
      }
      if (action.to === TaskPlaces.TIMETABLE) {
        return updateActivePlanTasks(plans, [
          ...tasks.slice(0, action.toIndex),
          action.task,
          ...tasks.slice(action.toIndex + taskSize),
        ])
      }
      return plans
    }
    default:
      return plans
  }
}

export default plans

const updateActivePlan = (plans: PlansState, plan: Plan): PlansState => ({
  ...plans,
  plans: [
    ...plans.plans.slice(0, plans.active),
    plan,
    ...plans.plans.slice(plans.active + 1),
  ],
})

const updateActivePlanTasks = (
  plans: PlansState,
  tasks: Array<?Task>
): PlansState => ({
  ...plans,
  plans: [
    ...plans.plans.slice(0, plans.active),
    {
      ...plans.plans[plans.active],
      tasks: tasks,
    },
    ...plans.plans.slice(plans.active + 1),
  ],
})
