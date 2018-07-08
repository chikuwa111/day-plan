// @flow
type AddAction = { type: 'PLAN__ADD' }
type SwitchAction = { type: 'PLAN__SWITCH', index: number }
type UpdateTitleAction = { type: 'PLAN__UPDATE_TITLE', title: string }
type UpdateTimeAction = {
  type: 'PLAN__UPDATE_TIME',
  name: 'start' | 'end',
  time: number,
}

export type PlanAction =
  | AddAction
  | SwitchAction
  | UpdateTitleAction
  | UpdateTimeAction

export const addPlan = () => ({
  type: 'PLAN__ADD',
})

export const switchPlan = (index: number) => ({
  type: 'PLAN__SWITCH',
  index,
})

export const updateTitle = (title: string) => ({
  type: 'PLAN__UPDATE_TITLE',
  title,
})

export const updateTime = (name: 'start' | 'end', time: number) => ({
  type: 'PLAN__UPDATE_TIME',
  name,
  time,
})
