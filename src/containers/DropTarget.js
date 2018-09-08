// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { DropTarget } from 'react-dnd'
import { moveTask } from '../actions/task'
import type { State, Task, TaskPlace } from '../types'
import { calcFromOffset, canMove } from '../lib/task'

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
  fromOffset: number,
|}

const mapStateToProps = (state: State) => ({
  tasks: state.plan.tasks,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ moveTask }, dispatch),
})

const dropTarget = {
  drop(props: Props, monitor) {
    const { task, place: from, index: fromIndex } = monitor.getItem()
    const { moveTask, place: to, index: toIndex, offset: toOffset } = props

    // https://github.com/react-dnd/react-dnd/pull/1082 が反映されたらfromOffsetをbeginDrag内で計算する
    const fromOffset = calcFromOffset(
      monitor.getInitialClientOffset(),
      monitor.getInitialSourceClientOffset()
    )

    moveTask(task, from, fromIndex, fromOffset, to, toIndex, toOffset || 0)
  },
  canDrop(props: Props, monitor) {
    const { task, place: from, index: fromIndex } = monitor.getItem()
    const { tasks, place: to, index: toIndex, offset: toOffset } = props

    // https://github.com/react-dnd/react-dnd/pull/1082 が反映されたらfromOffsetをbeginDrag内で計算する
    const fromOffset = calcFromOffset(
      monitor.getInitialClientOffset(),
      monitor.getInitialSourceClientOffset()
    )

    return canMove(
      tasks,
      task,
      from,
      fromIndex,
      fromOffset,
      to,
      toIndex,
      toOffset || 0
    )
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item: monitor.getItem(),
  // https://github.com/react-dnd/react-dnd/pull/1082 が反映されたらfromOffsetをbeginDrag内で計算する
  fromOffset: calcFromOffset(
    monitor.getInitialClientOffset(),
    monitor.getInitialSourceClientOffset()
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  DropTarget('TASK', dropTarget, collect)(
    pure(function DropTarget(props: Props) {
      const { connectDropTarget, isOver, canDrop, item, fromOffset } = props
      const color = getColor(isOver, canDrop)

      return (
        <Target
          displayPreview={isOver}
          color={color}
          size={item && item.task.length / 30}
          fromOffset={fromOffset}
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
  position: relative;
  &::before {
    content: '';
    position: absolute;
    pointer-events: none;
    bottom: 2rem;
    width: 100%;
    height: ${props => (!props.displayPreview ? 0 : props.fromOffset * 2)}rem;
    background-color: ${props => props.color};
  }
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 2rem;
    width: 100%;
    height: ${props =>
      !props.displayPreview ? 0 : (props.size - props.fromOffset - 1) * 2}rem;
    background-color: ${props => props.color};
  }
`
