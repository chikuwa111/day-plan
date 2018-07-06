// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { DropTarget } from 'react-dnd'
import type { Task, TaskPlace } from '../types'

type Props = {|
  place: TaskPlace,
  index: number,
  onClick: () => void,
  onDrop: (Task, TaskPlace, number, number) => void,
  connectDropTarget: Function,
|}

const dropTarget = {
  drop(props, monitor) {
    const { task, place, index } = monitor.getItem()
    props.onDrop(task, place, index, props.index)
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
})

export default DropTarget('TASK', dropTarget, collect)(
  pure(function EmptyTask(props: Props) {
    const { onClick, connectDropTarget } = props

    return (
      <Container
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
  background-color: rgba(250, 250, 250, 0.5);
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
`

const Body = styled.div`
  width: 100%;
  word-break: break-all;
  text-align: center;
`
