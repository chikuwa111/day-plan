// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

export default pure(function Loading() {
  return (
    <Container>
      <Typography align="center" variant="display1">
        Day Plan
      </Typography>
      <MarginDiv />
      <CircularProgress size={120} thickness={5} />
    </Container>
  )
})

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MarginDiv = styled.div`
  height: 20px;
`
