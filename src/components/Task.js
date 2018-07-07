// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { DragSource } from 'react-dnd'
import { TaskPlaces } from '../constants'
import type { Task, TaskPlace } from '../types'
import Card from '@material-ui/core/Card'
import EmptyTask from '../components/EmptyTask'

type Props = {|
  task: Task,
  place: TaskPlace,
  index: number,
  tasks: Array<Task>,
  onClick: () => void,
  onDrop: (Task, TaskPlace, number, number, number) => void,
  connectDragSource: Function,
  connectDragPreview: Function,
  isDragging: boolean,
|}

const dragSource = {
  beginDrag(props) {
    return {
      task: props.task,
      place: props.place,
      index: props.index,
    }
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
})

export default DragSource('TASK', dragSource, collect)(
  pure(function Task(props: Props) {
    const {
      task,
      place,
      index,
      tasks,
      onClick,
      onDrop,
      connectDragSource,
      connectDragPreview,
      isDragging,
    } = props

    return connectDragPreview(
      <div style={wrapperStyle}>
        <Container opacity={isDragging ? 0.5 : 1} task={task} onClick={onClick}>
          <Body>{task.body}</Body>
        </Container>
        <CoveredContainer>
          <DragSourceDiv innerRef={instance => connectDragSource(instance)} />
          {isDragging &&
            place === TaskPlaces.TIMETABLE && (
              <DropTargets
                task={task}
                place={place}
                index={index}
                tasks={tasks}
                onDrop={onDrop}
              />
            )}
        </CoveredContainer>
      </div>
    )
  })
)

const wrapperStyle = {
  position: 'relative',
}

const Container = styled(Card)`
  && {
    width: 100%;
    height: ${props => props.task.length / 15}rem;
    background-color: ${props => props.task.color};
    font-size: ${props => 0.8 + props.task.length / 150}rem;
    opacity: ${props => props.opacity};
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`

const Body = styled.div`
  width: 98%;
  margin-left: 2%;
  word-break: break-all;
`

const CoveredContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`

const DragSourceDiv = styled.div`
  height: 2rem;
  cursor: move;
`

const DropTargets = ({ task, place, index, tasks, onDrop }) => {
  const EmptyTasks = []
  const taskSize = task.length / 30
  for (let i = 1; i < taskSize; i++) {
    EmptyTasks.push(
      <EmptyTask
        key={i}
        offset={i}
        place={place}
        index={index}
        tasks={tasks}
        onDrop={onDrop}
      />
    )
  }
  return EmptyTasks
}
