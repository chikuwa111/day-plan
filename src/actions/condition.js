// @flow
import type { PlanList, TaskPlace } from '../types'
type UpdateLoadingAction = {
  type: 'CONDITION__UPDATE_LOADING',
  loading: boolean,
  noPersist: true,
}
type UpdatePlanListAction = {|
  type: 'CONDITION__UPDATE_PLAN_LIST',
  planList: PlanList,
  noPersist: true,
|}
type UpdateEditingAction = {
  type: 'CONDITION__UPDATE_EDITING',
  place: TaskPlace,
  index: number,
  noPersist: true,
}

export type ConditionAction =
  | UpdateLoadingAction
  | UpdatePlanListAction
  | UpdateEditingAction

export const updateLoading = (loading: boolean): UpdateLoadingAction => ({
  type: 'CONDITION__UPDATE_LOADING',
  loading,
  noPersist: true,
})

export const updatePlanList = (planList: PlanList): UpdatePlanListAction => ({
  type: 'CONDITION__UPDATE_PLAN_LIST',
  planList,
  noPersist: true,
})

export const updateEditing = (
  place: TaskPlace,
  index: number
): UpdateEditingAction => ({
  type: 'CONDITION__UPDATE_EDITING',
  place,
  index,
  noPersist: true,
})
