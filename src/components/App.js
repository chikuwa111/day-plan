// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import TimeTable from '../containers/TimeTable'
import Stock from '../containers/Stock'

export default pure(function App() {
  return (
    <GridWrapper container spacing={16}>
      <GridWrapper item xs={12} md={8}>
        <TimeTable />
      </GridWrapper>
      <GridWrapper item xs={12} md={4}>
        <Stock />
      </GridWrapper>
    </GridWrapper>
  )
})

const GridWrapper = styled(Grid)`
  && {
    height: 100%;
  }
`
