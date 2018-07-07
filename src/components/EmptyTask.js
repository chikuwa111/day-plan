// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { DropTarget } from 'react-dnd'
import { TaskPlaces } from '../constants'
import type { Task, TaskPlace } from '../types'

type Props = {|
  place: TaskPlace,
  index: number,
  offset?: number,
  tasks: Array<Task>,
  onClick?: () => void,
  onDrop: (Task, TaskPlace, number, number, ?number) => void,
  connectDropTarget: Function,
  isOver: boolean,
  canDrop: boolean,
  item: {
    task: Task,
    place: TaskPlace,
    index: number,
  },
|}

const dropTarget = {
  drop(props: Props, monitor) {
    const { task, place, index } = monitor.getItem()
    props.onDrop(task, place, index, props.index, props.offset)
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

const getColor = (isOver, canDrop) => {
  if (isOver && canDrop) return 'green'
  if (isOver && !canDrop) return 'red'
  return 'transparent'
}

export default DropTarget('TASK', dropTarget, collect)(
  pure(function EmptyTask(props: Props) {
    const { onClick, connectDropTarget, isOver, canDrop, item } = props

    const color = getColor(isOver, canDrop)

    return (
      <Container
        color={color}
        length={item && item.task.length}
        displayPreview={isOver && canDrop}
        onClick={onClick}
        innerRef={instance => connectDropTarget(instance)}
      >
        <Body>+</Body>
      </Container>
    )
  })
)

const Container = styled.div`
  width: 99%;
  height: 1.9rem;
  background-color: ${props => props.color};
  opacity: 0.5;
  border-top: 0.05rem dashed lightgray;
  border-right: 0.1rem dashed lightgray;
  border-bottom: 0.05rem dashed lightgray;
  border-left: 0.1rem dashed lightgray;
  border-radius: 4px;
  font-size: 1rem;
  color: lightgray;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 1.9rem;
    width: 100%;
    height: ${props =>
      props.displayPreview ? (props.length - 30) / 15 : 0}rem;
    background-color: ${props => props.color};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`

const Body = styled.div`
  width: 100%;
  word-break: break-all;
  text-align: center;
`
