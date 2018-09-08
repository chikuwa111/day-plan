// @flow
import type { PlanList } from '../types'
type UpdateLoadingAction = {
  type: 'CONDITION__UPDATE_LOADING',
  loading: boolean,
  noPersist: true,
}
type UpdatePlanListAction = {|
  type: 'CONDITION__UPDATE_PLAN_LIST',
  planList: PlanList,
|}

export type ConditionAction = UpdateLoadingAction | UpdatePlanListAction

export const updateLoading = (loading: boolean): UpdateLoadingAction => ({
  type: 'CONDITION__UPDATE_LOADING',
  loading,
  noPersist: true,
})

export const updatePlanList = (planList: PlanList): UpdatePlanListAction => ({
  type: 'CONDITION__UPDATE_PLAN_LIST',
  planList,
})
