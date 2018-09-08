// @flow

export type State = {
  condition: ConditionState,
  session: SessionState,
  stock: StockState,
  plan: PlanState,
}

export type ConditionState = {|
  loading: boolean,
  editing: {
    place: TaskPlace,
    index: number,
  },
  planList: PlanList,
|}

export type SessionState = {|
  activePlanId: string,
|}

export type StockState = Array<Task>

export type PlanState = Plan

export type PlanList = Array<{| id: string, title: string |}>

export type Plan = {|
  title: string,
  start: number,
  end: number,
  tasks: Array<?Task>,
  cloudId?: ?string,
|}

export type Task = {|
  id: string,
  body: string,
  color: string,
  length: number,
|}

export type TaskPlace = ?('TimeTable' | 'Stock')
