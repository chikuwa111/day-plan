// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { DropTarget } from 'react-dnd'
import { moveTask } from '../actions/task'
import type { State, Task, TaskPlace } from '../types'
import { canMove } from '../lib/task'

type Props = {|
  place: TaskPlace,
  index: number,
  offset?: number,

  tasks: Array<?Task>,
  moveTask: (
    task: Task,
    from: TaskPlace,
    fromIndex: number,
    fromOffset: number,
    to: TaskPlace,
    toIndex: number,
    toOffset: number
  ) => void,

  connectDropTarget: Function,
  isOver: boolean,
  canDrop: boolean,
  item: {
    task: Task,
    place: TaskPlace,
    index: number,
  },
|}

const mapStateToProps = (state: State) => {
  const plan = state.plans.plans[state.plans.active]
  return {
    tasks: plan.tasks,
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ moveTask }, dispatch),
})

const dropTarget = {
  drop(props: Props, monitor) {
    const { task, place: from, index: fromIndex } = monitor.getItem()
    const { moveTask, place: to, index: toIndex, offset: toOffset } = props

    moveTask(task, from, fromIndex, 0, to, toIndex, toOffset || 0)
  },
  canDrop(props: Props, monitor) {
    const { task, place: from, index: fromIndex } = monitor.getItem()
    const { tasks, place: to, index: toIndex, offset: toOffset } = props

    return canMove(tasks, task, from, fromIndex, 0, to, toIndex, toOffset || 0)
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  DropTarget('TASK', dropTarget, collect)(
    pure(function DropTarget(props: Props) {
      const { connectDropTarget, isOver, canDrop, item } = props
      const color = getColor(isOver, canDrop)

      return (
        <Target
          color={color}
          length={item && item.task.length}
          displayPreview={isOver && canDrop}
          innerRef={instance => connectDropTarget(instance)}
        />
      )
    })
  )
)

const getColor = (isOver, canDrop) => {
  if (isOver && canDrop) return 'green'
  if (isOver && !canDrop) return 'red'
  return 'transparent'
}

const Target = styled.div`
  width: 100%;
  height: 2rem;
  opacity: 0.5;
  background-color: ${props => props.color};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 2rem;
    width: 100%;
    height: ${props =>
      props.displayPreview ? (props.length - 30) / 15 : 0}rem;
    background-color: ${props => props.color};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`
