// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import type { Task } from '../types'
import TaskComp from '../components/shared/Task'

export default pure(function App() {
  const taskList: Array<Task> = [
    { body: 'aaa', color: '#fafafa', length: 30, from: 1 },
    { body: 'bbb', color: '#ffd180', length: 120, from: 1 },
    { body: 'cccccccc', color: '#80d8ff', length: 90, from: 1 },
    { body: 'd', color: '#ccff90', length: 60, from: 1 },
  ]

  return (
    <div>{taskList.map(task => <TaskComp key={task.body} task={task} />)}</div>
  )
})
