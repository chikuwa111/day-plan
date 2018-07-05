// @flow

export type State = {
  +tasks: TasksState,
  +setting: SettingState,
  +stock: StockState,
  +session: SessionState,
}

export type TasksState = Array<?Task>

export type SettingState = {|
  title: string,
  begin: number,
  end: number,
|}

export type StockState = Array<Task>

export type SessionState = {|
  editingPlace: EditingPlace,
  editingIndex: number,
|}

export type Task = {|
  id: string,
  body: string,
  color: string,
  length: number,
|}

export type EditingPlace = ?('TimeTable' | 'Stock')
