// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import type { Task } from '../../types'

type Props = {|
  task: Task,
|}

export default pure(function Task(props: Props) {
  const { task } = props

  return (
    <Container task={task}>
      <Body>{task.body}</Body>
    </Container>
  )
})

const Container = styled(Card)`
  && {
    max-width: 90%;
    display: flex;
    align-items: center;
    background-color: ${props => props.task.color};
    height: ${props => props.task.length / 15}rem;
    font-size: ${props => 0.8 + props.task.length / 150}rem;
  }
`

const Body = styled.div`
  width: 98%;
  margin-left: 2%;
  word-break: break-all;
`
