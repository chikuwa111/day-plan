// @flow
import type { SessionState, StockState, PlanState } from '../types'
import type { PlanAction } from './plan'
import type { TaskAction } from './task'
import type { StockAction } from './stock'
import type { ConditionAction } from './condition'

type InitAction = {
  type: 'INIT',
  session: ?SessionState,
  stock: ?StockState,
  plan: ?PlanState,
  noPersist: true,
}

export const initStore = (
  session: ?SessionState,
  stock: ?StockState,
  plan: ?PlanState
): InitAction => ({
  type: 'INIT',
  session,
  stock,
  plan,
  noPersist: true,
})

export type Action =
  | InitAction
  | PlanAction
  | TaskAction
  | StockAction
  | ConditionAction
