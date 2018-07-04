// @flow
import type { TasksAction } from './tasks'
import type { FormAction } from './form'
import type { StockAction } from './stock'

export type Action = TasksAction | FormAction | StockAction
