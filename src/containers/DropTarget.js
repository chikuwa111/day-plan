// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { DropTarget } from 'react-dnd'
import { move } from '../actions/tasks'
import { TaskPlaces } from '../constants'
import type { State, Task, TaskPlace } from '../types'

type Props = {|
  place: TaskPlace,
  index: number,
  offset?: number,

  tasks: Array<Task>,
  move: (
    task: Task,
    from: TaskPlace,
    fromIndex: number,
    to: TaskPlace,
    toIndex: number,
    offset: number
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

const mapStateToProps = (state: State) => ({
  tasks: state.tasks,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ move }, dispatch),
})

const dropTarget = {
  drop(props: Props, monitor) {
    const { task, place, index } = monitor.getItem()
    props.move(task, place, index, props.place, props.index, props.offset || 0)
  },
  canDrop(props, monitor) {
    const {
      task: draggedTask,
      place: from,
      index: fromIndex,
    } = monitor.getItem()
    const { place: to, index: toIndex, offset, tasks } = props

    if (from === TaskPlaces.STOCK && to === TaskPlaces.STOCK) {
      return false
    }
    if (from === TaskPlaces.TIMETABLE && to === TaskPlaces.STOCK) {
      return true
    }
    if (from === TaskPlaces.STOCK && to === TaskPlaces.TIMETABLE) {
      const taskSize = draggedTask.length / 30
      const dropTargets = tasks.slice(toIndex, toIndex + taskSize)
      return (
        dropTargets.length >= taskSize &&
        dropTargets.every(task => task == null)
      )
    }
    if (from === TaskPlaces.TIMETABLE && to === TaskPlaces.TIMETABLE) {
      const taskSize = draggedTask.length / 30
      if (fromIndex === toIndex && offset) {
        const dropTargets = tasks.slice(toIndex + 1, toIndex + 1 + offset)
        return (
          dropTargets.length >= offset &&
          dropTargets.every(task => task == null)
        )
      }
      const moveSize = Math.abs(toIndex - fromIndex)
      if (toIndex < fromIndex && moveSize < taskSize) {
        const dropTargets = tasks.slice(toIndex, fromIndex)
        return dropTargets.every(task => task == null)
      }
      const dropTargets = tasks.slice(toIndex, toIndex + taskSize)
      return (
        dropTargets.length >= taskSize &&
        dropTargets.every(task => task == null)
      )
    }
    console.error('Unexpected dragging task')
    return false
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
  height: ${props => (props.displayPreview ? props.length / 15 : 2)}rem;
  opacity: 0.5;
  background-color: ${props => props.color};
  border-radius: 4px;
`
