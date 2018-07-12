// @flow
type AddAction = { type: 'PLAN__ADD' }
type DestroyAction = { type: 'PLAN__DESTROY' }
type SwitchAction = { type: 'PLAN__SWITCH', id: string }
type UpdateTitleAction = { type: 'PLAN__UPDATE_TITLE', title: string }
type UpdateTimeAction = {
  type: 'PLAN__UPDATE_TIME',
  name: 'start' | 'end',
  time: number,
}

export type PlanAction =
  | AddAction
  | DestroyAction
  | SwitchAction
  | UpdateTitleAction
  | UpdateTimeAction

export const addPlan = () => ({
  type: 'PLAN__ADD',
})

export const destroyPlan = () => ({
  type: 'PLAN__DESTROY',
})

export const switchPlan = (id: number) => ({
  type: 'PLAN__SWITCH',
  id,
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
