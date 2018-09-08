// @flow
import type { PlanList } from '../types'
type UpdatePlanListAction = {
  type: 'CONDITION__UPDATE_PLAN_LIST',
  planList: PlanList,
}

export type ConditionAction = UpdatePlanListAction

export const updatePlanList = (planList: PlanList): UpdatePlanListAction => ({
  type: 'CONDITION__UPDATE_PLAN_LIST',
  planList,
})
