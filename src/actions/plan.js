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
type UpdateCloudIdAction = {
  type: 'PLAN__UPDATE_CLOUD_ID',
  cloudId: ?string,
}

export type PlanAction =
  | AddAction
  | DestroyAction
  | SwitchAction
  | UpdateTitleAction
  | UpdateTimeAction
  | UpdateCloudIdAction

export const addPlan = (): AddAction => ({
  type: 'PLAN__ADD',
})

export const destroyPlan = (): DestroyAction => ({
  type: 'PLAN__DESTROY',
})

export const switchPlan = (id: string): SwitchAction => ({
  type: 'PLAN__SWITCH',
  id,
})

export const updateTitle = (title: string): UpdateTitleAction => ({
  type: 'PLAN__UPDATE_TITLE',
  title,
})

export const updateTime = (
  name: 'start' | 'end',
  time: number
): UpdateTimeAction => ({
  type: 'PLAN__UPDATE_TIME',
  name,
  time,
})

export const updateCloudId = (cloudId: ?string): UpdateCloudIdAction => ({
  type: 'PLAN__UPDATE_CLOUD_ID',
  cloudId,
})
