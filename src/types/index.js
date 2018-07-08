// @flow

export type State = {
  plans: PlansState,
  stock: StockState,
  session: SessionState,
}

export type PlansState = {|
  active: number,
  plans: Array<Plan>,
|}

export type StockState = Array<Task>

export type SessionState = {|
  editing: {
    place: TaskPlace,
    index: number,
  },
|}

export type Plan = {|
  title: string,
  begin: number,
  end: number,
  tasks: Array<?Task>,
|}

export type Task = {|
  id: string,
  body: string,
  color: string,
  length: number,
|}

export type TaskPlace = ?('TimeTable' | 'Stock')
