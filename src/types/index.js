// @flow

export type State = {
  condition: ConditionState,
  session: SessionState,
  stock: StockState,
  plan: PlanState,
}

export type ConditionState = {|
  editing: {
    place: TaskPlace,
    index: number,
  },
  plans: Array<{| id: string, title: string |}>,
|}

export type SessionState = {|
  activePlanId: ?string,
|}

export type StockState = Array<Task>

export type PlanState = Plan

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
