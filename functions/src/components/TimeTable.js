// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { Plan } from '../../../src/types'
import Grid from '@material-ui/core/Grid'
import Timeline from '../components/Timeline'
import Task from '../components/Task'
import EmptyTask from '../components/EmptyTask'

type Props = {|
  plan: Plan,
|}

export default function TimeTable(props: Props) {
  const { plan } = props
  const { start, end, tasks } = plan

  return (
    <Container>
      <MarginDiv />
      <GridWrapper container>
        <Grid item xs={2} sm={1}>
          <Timeline start={start} end={end} />
        </Grid>
        <Grid item xs={10} sm={11}>
          <MarginDiv />
          {tasks.map((task, index, tasks) => {
            if (task == null) {
              return <EmptyTask key={index} />
            } else {
              return <Task key={task.id} task={task} />
            }
          })}
        </Grid>
      </GridWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-right: 2%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  @media (min-width: 600px) {
    padding-right: 1%;
  }
`

const GridWrapper = styled(Grid)`
  && {
    height: 100%;
  }
`

const MarginDiv = styled.div`
  height: 0.6rem;
`
