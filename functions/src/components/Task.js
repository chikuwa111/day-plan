// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { Task as TaskType } from '../../../src/types'
import Card from '@material-ui/core/Card'

type Props = {|
  task: TaskType,
|}

export default function Task(props: Props) {
  const { task } = props

  return (
    <Container task={task}>
      <Body>{task.body}</Body>
    </Container>
  )
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
