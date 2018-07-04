// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import type { State, Task } from '../types'
import { add } from '../actions/stock'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TaskComp from '../components/Task'
import EmptyTask from '../components/EmptyTask'

type Props = {|
  tasks: Array<Task>,
  add: () => void,
|}

function Stock(props: Props) {
  const { tasks, add } = props

  return (
    <ContainerPaper>
      <Grid container direction="column" spacing={8}>
        <EmptyTask onClick={add} />
        {tasks.map(task => (
          <Grid item key={task.id}>
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

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ add }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(pure(Stock))
