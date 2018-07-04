// @flow

export type State = {
  +tasks: TasksState,
  +setting: SettingState,
  +form: FormState,
  +stock: StockState,
}

export type TasksState = Array<?Task>

export type SettingState = {|
  title: string,
  begin: number,
  end: number,
|}

export type FormState = Task

export type StockState = Array<Task>

export type Task = {|
  body: string,
  color: string,
  length: number,
|}
