// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { DragSource } from 'react-dnd'
import type { Task, TaskPlace } from '../types'
import Card from '@material-ui/core/Card'

type Props = {|
  task: Task,
  place: TaskPlace,
  index: number,
  onClick: () => void,
  connectDragSource: Function,
  connectDragPreview: Function,
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
})

export default DragSource('TASK', dragSource, collect)(
  pure(function Task(props: Props) {
    const { task, onClick, connectDragSource, connectDragPreview } = props

    return connectDragPreview(
      <div>
        <Container task={task} onClick={onClick}>
          <Body>{task.body}</Body>
          <DragSourceDiv innerRef={instance => connectDragSource(instance)} />
        </Container>
      </div>
    )
  })
)

const Container = styled(Card)`
  && {
    width: 100%;
    height: ${props => props.task.length / 15}rem;
    background-color: ${props => props.task.color};
    font-size: ${props => 0.8 + props.task.length / 150}rem;
    display: flex;
    align-items: center;
    position: relative;
  }
`

const Body = styled.div`
  width: 98%;
  margin-left: 2%;
  word-break: break-all;
`

const DragSourceDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 2rem;
  top: 0;
`
