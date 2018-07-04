// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TaskComp from '../components/shared/Task'
import type { State, Task } from '../types'

type Props = {|
  tasks: Array<Task>,
|}

function Stock(props: Props) {
  const { tasks } = props

  return (
    <ContainerPaper>
      <Grid container direction="column" spacing={8}>
        {tasks.map(task => (
          <Grid item key={task.body}>
            <TaskComp task={task} />
          </Grid>
        ))}
      </Grid>
    </ContainerPaper>
  )
}

const ContainerPaper = styled(Paper)`
  && {
    width: 96%;
    height: 96%;
    padding: 2%;
    overflow: auto;
  }
`

const mapStateToProps = (state: State) => ({
  tasks: state.stock,
})

export default connect(mapStateToProps)(pure(Stock))
