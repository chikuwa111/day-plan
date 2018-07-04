// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import type { State, Task } from '../types'
import Grid from '@material-ui/core/Grid'
import Timeline from '../components/Timeline'
import TaskComp from '../components/shared/Task'
import EmptyTask from '../components/EmptyTask'

type Props = {|
  begin: number,
  end: number,
  tasks: Array<?Task>,
|}

function TimeTable(props: Props) {
  const { begin, end, tasks } = props

  return (
    <Container>
      <GridWrapper container>
        <Grid item xs={2} sm={1}>
          <Timeline begin={begin} end={end} />
        </Grid>
        <Grid item xs={10} sm={11}>
          <MarginDiv />
          {tasks.map(
            task =>
              task == null ? (
                <EmptyTask />
              ) : (
                <TaskComp key={task.body} task={task} />
              )
          )}
        </Grid>
      </GridWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`

const GridWrapper = styled(Grid)`
  && {
    height: 100%;
  }
`

const MarginDiv = styled.div`
  height: 0.8rem;
`

const mapStateToProps = (state: State) => ({
  begin: state.setting.begin,
  end: state.setting.end,
  tasks: state.tasks,
})

export default connect(mapStateToProps)(pure(TimeTable))
