// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import type { Task } from '../types'
import Grid from '@material-ui/core/Grid'
import TimeTable from '../containers/TimeTable'
import Form from '../containers/Form'
import Stock from '../containers/Stock'

export default pure(function App() {
  const taskList: Array<Task> = [
    { body: 'aaa', color: '#fafafa', length: 30 },
    { body: 'bbb', color: '#ffd180', length: 120 },
    { body: 'cccccccc', color: '#80d8ff', length: 90 },
    { body: 'd', color: '#ccff90', length: 60 },
    { body: 'eeee', color: '#fafafa', length: 30 },
  ]

  return (
    <GridWrapper container spacing={16}>
      <GridWrapper item xs={12} md={8}>
        <TimeTable begin={6} end={24} tasks={taskList} />
      </GridWrapper>
      <GridWrapper item xs={12} md={4}>
        <GridWrapper container direction="column" spacing={16}>
          <GridWrapper60 item>
            <Stock />
          </GridWrapper60>
          <Grid item>
            <Form />
          </Grid>
        </GridWrapper>
      </GridWrapper>
    </GridWrapper>
  )
})

const GridWrapper = styled(Grid)`
  && {
    height: 100%;
  }
`

const GridWrapper60 = styled(Grid)`
  && {
    height: 60%;
    margin-bottom: 8px;
  }
`
