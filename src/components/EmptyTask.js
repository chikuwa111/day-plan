// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import type { TaskPlace } from '../types'
import DropTarget from '../containers/DropTarget'

type Props = {|
  place: TaskPlace,
  index: number,
  onClick: () => void,
|}

export default pure(function EmptyTask(props: Props) {
  const { place, index, onClick } = props

  return (
    <Container onClick={onClick}>
      <Wrapper>
        <Body>+</Body>
      </Wrapper>
      <CoveredWrapper>
        <DropTarget place={place} index={index} />
      </CoveredWrapper>
    </Container>
  )
})

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

const CoveredWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`
