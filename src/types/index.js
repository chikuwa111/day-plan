// @flow

export type State = {
  plans: PlansState,
  stock: StockState,
  session: SessionState,
}

export type PlansState = {|
  active: string,
  plans: { [id: string]: Plan },
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
