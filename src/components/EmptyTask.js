// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'

export default pure(function EmptyTask() {
  return (
    <Container>
      <Body>+</Body>
    </Container>
  )
})

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
`

const Body = styled.div`
  width: 100%;
  word-break: break-all;
  text-align: center;
`
