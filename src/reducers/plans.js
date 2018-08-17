// @flow
import nanoid from 'nanoid'
import { newTask, newEmptyTasks, newPlan, move } from '../lib/task'
import { TutorialPlan } from '../constants'
import type { Action } from '../actions'
import type { PlansState, Plan, Task } from '../types'

const initialState: (plan: ?Plan) => PlansState = plan => {
  const id = nanoid(7)
  return {
    active: id,
    plans: {
      [id]: plan || newPlan(),
    },
  }
}

const plans = (
  plans: PlansState = initialState(TutorialPlan),
  action: Action
): PlansState => {
  const plan = plans.plans[plans.active]
  const tasks = plan.tasks
  switch (action.type) {
    case 'PLAN__ADD': {
      const id = nanoid(7)
      return {
        ...plans,
        active: id,
        plans: { ...plans.plans, [id]: newPlan() },
      }
    }
    case 'PLAN__DESTROY': {
      if (Object.keys(plans.plans).length === 1) {
        return initialState()
      }
      const { [plans.active]: deletingPlan, ...withoutDeleting } = plans.plans
      return {
        ...plans,
        active: Object.keys(withoutDeleting)[0],
        plans: withoutDeleting,
      }
    }
    case 'PLAN__SWITCH':
      return {
        ...plans,
        active: action.id,
      }
    case 'PLAN__UPDATE_TITLE':
      return updateActivePlan(plans, {
        ...plan,
        title: action.title,
      })
    case 'PLAN__UPDATE_TIME':
      if (action.name === 'start') {
        if (action.time < plan.start) {
          return updateActivePlan(plans, {
            ...plan,
            start: action.time,
            tasks: [...newEmptyTasks((plan.start - action.time) * 2), ...tasks],
          })
        }
        return updateActivePlan(plans, {
          ...plan,
          start: action.time,
          tasks: tasks.slice((action.time - plan.start) * 2, tasks.length),
        })
      }
      if (action.time < plan.end) {
        return updateActivePlan(plans, {
          ...plan,
          end: action.time,
          tasks: tasks.slice(0, tasks.length - (plan.end - action.time) * 2),
        })
      }
      return updateActivePlan(plans, {
        ...plan,
        end: action.time,
        tasks: [...tasks, ...newEmptyTasks((action.time - plan.end) * 2)],
      })
    case 'PLAN__UPDATE_CLOUD_ID':
      return updateActivePlan(plans, {
        ...plan,
        cloudId: action.cloudId,
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
          ...newEmptyTasks(-1 * lengthDiffSize),
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
        ...newEmptyTasks(destroySize),
        ...tasks.slice(action.index + 1),
      ])
    }
    case 'TASK__MOVE': {
      return updateActivePlanTasks(
        plans,
        move(
          tasks,
          action.task,
          action.from,
          action.fromIndex,
          action.fromOffset,
          action.to,
          action.toIndex,
          action.toOffset
        )
      )
    }
    default:
      return plans
  }
}

export default plans

const updateActivePlan = (plans: PlansState, plan: Plan): PlansState => ({
  ...plans,
  plans: {
    ...plans.plans,
    [plans.active]: plan,
  },
})

const updateActivePlanTasks = (
  plans: PlansState,
  tasks: Array<?Task>
): PlansState => ({
  ...plans,
  plans: {
    ...plans.plans,
    [plans.active]: {
      ...plans.plans[plans.active],
      tasks: tasks,
    },
  },
})
