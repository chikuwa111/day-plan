// @flow
import * as React from 'react'
import styled from 'styled-components'

export default function EmptyTask() {
  return (
    <Container>
      <Wrapper>
        <Body>+</Body>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
`

const Wrapper = styled.div`
  width: 100%;
  height: 2rem;
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
`

const Body = styled.div`
  width: 100%;
  word-break: break-all;
  text-align: center;
`
