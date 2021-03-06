// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { DragSource } from 'react-dnd'
import { TaskPlaces } from '../constants'
import type { Task, TaskPlace } from '../types'
import Card from '@material-ui/core/Card'
import DropTarget from '../containers/DropTarget'

type Props = {|
  task: Task,
  place: TaskPlace,
  index: number,
  updateEditing: (TaskPlace, number) => void,

  connectDragSource: Function,
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
  isDragging: monitor.isDragging(),
})

export default DragSource('TASK', dragSource, collect)(
  pure(function Task(props: Props) {
    const {
      task,
      place,
      index,
      updateEditing,
      connectDragSource,
      isDragging,
    } = props
    const onClick = () => {
      updateEditing(place, index)
    }

    return connectDragSource(
      <div style={wrapperStyle} onClick={onClick}>
        <Container opacity={isDragging ? 0.5 : 1} task={task}>
          <Body>{task.body}</Body>
        </Container>
        <CoveredContainer>
          {isDragging &&
            place === TaskPlaces.TIMETABLE &&
            Array.from({ length: task.length / 30 }, (_, i) => (
              <DropTarget key={i} offset={i} place={place} index={index} />
            ))}
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
