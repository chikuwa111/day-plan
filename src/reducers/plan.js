// @flow
import { newTask, newEmptyTasks, newPlan, move } from '../lib/task'
import { TutorialPlan } from '../constants'
import type { Action } from '../actions'
import type { PlanState } from '../types'

const initialState: PlanState = TutorialPlan

const plan = (plan: PlanState = initialState, action: Action): PlanState => {
  switch (action.type) {
    case 'INIT':
      return action.plan || plan
    case 'PLAN__SWITCH':
      // persistはいらない
      return action.plan
    case 'PLAN__ADD':
      return newPlan()
    case 'PLAN__UPDATE_TITLE':
      return {
        ...plan,
        title: action.title,
      }
    case 'PLAN__UPDATE_TIME':
      if (action.name === 'start') {
        if (action.time < plan.start) {
          return {
            ...plan,
            start: action.time,
            tasks: [
              ...newEmptyTasks((plan.start - action.time) * 2),
              ...plan.tasks,
            ],
          }
        }
        return {
          ...plan,
          start: action.time,
          tasks: plan.tasks.slice(
            (action.time - plan.start) * 2,
            plan.tasks.length
          ),
        }
      }
      if (action.time < plan.end) {
        return {
          ...plan,
          end: action.time,
          tasks: plan.tasks.slice(
            0,
            plan.tasks.length - (plan.end - action.time) * 2
          ),
        }
      }
      return {
        ...plan,
        end: action.time,
        tasks: [...plan.tasks, ...newEmptyTasks((action.time - plan.end) * 2)],
      }
    case 'PLAN__UPDATE_CLOUD_ID':
      return {
        ...plan,
        cloudId: action.cloudId,
      }
    case 'TASK__ADD':
      return {
        ...plan,
        tasks: [
          ...plan.tasks.slice(0, action.index),
          newTask(),
          ...plan.tasks.slice(action.index + 1),
        ],
      }
    case 'TASK__UPDATE': {
      const task = plan.tasks[action.index]
      if (task == null) {
        console.error('Unexpected TASKS_UPDATE')
        return plan
      }
      const lengthDiffSize = (action.task.length - task.length) / 30
      if (lengthDiffSize >= 0) {
        return {
          ...plan,
          tasks: [
            ...plan.tasks.slice(0, action.index),
            action.task,
            ...plan.tasks.slice(action.index + lengthDiffSize + 1),
          ],
        }
      } else {
        return {
          ...plan,
          tasks: [
            ...plan.tasks.slice(0, action.index),
            action.task,
            ...newEmptyTasks(-1 * lengthDiffSize),
            ...plan.tasks.slice(action.index + 1),
          ],
        }
      }
    }
    case 'TASK__DESTROY': {
      const task = plan.tasks[action.index]
      if (task == null) {
        console.error('Unexpected TASKS__DESTROY')
        return plan
      }
      const destroySize = task.length / 30
      return {
        ...plan,
        tasks: [
          ...plan.tasks.slice(0, action.index),
          ...newEmptyTasks(destroySize),
          ...plan.tasks.slice(action.index + 1),
        ],
      }
    }
    case 'TASK__MOVE': {
      return {
        ...plan,
        tasks: move(
          plan.tasks,
          action.task,
          action.from,
          action.fromIndex,
          action.fromOffset,
          action.to,
          action.toIndex,
          action.toOffset
        ),
      }
    }
    default:
      return plan
  }
}

export default plan
