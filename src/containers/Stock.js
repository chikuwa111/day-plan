// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { TaskPlaces } from '../constants'
import type { State, Task, TaskPlace } from '../types'
import { addStock, updateStock, destroyStock } from '../actions/stock'
import { updateEditing } from '../actions/condition'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TaskComp from '../components/Task'
import EmptyTask from '../components/EmptyTask'
import EditingTask from '../components/EditingTask'

type Props = {|
  tasks: Array<Task>,
  editingIndex: ?number,
  addStock: () => void,
  updateStock: (number, Task) => void,
  destroyStock: number => void,
  updateEditing: (TaskPlace, number) => void,
|}

const mapStateToProps = (state: State) => ({
  tasks: state.stock,
  editingIndex:
    state.condition.editing.place === TaskPlaces.STOCK
      ? state.condition.editing.index
      : null,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    { addStock, updateStock, destroyStock, updateEditing },
    dispatch
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  pure(function Stock(props: Props) {
    const {
      tasks,
      editingIndex,
      addStock,
      updateStock,
      destroyStock,
      updateEditing,
    } = props

    console.log('render stock')

    return (
      <ContainerPaper>
        <Grid container direction="column" spacing={8}>
          <EmptyTask place={TaskPlaces.STOCK} index={0} addTask={addStock} />
          {tasks.map((task, index) => (
            <Grid item key={task.id}>
              {editingIndex != null && editingIndex === index ? (
                <EditingTask
                  task={task}
                  maxLength={null}
                  onChange={(task: Task) => {
                    updateStock(index, task)
                  }}
                  onDestroy={() => {
                    destroyStock(index)
                  }}
                  closeEditing={() => {
                    updateEditing(null, -1)
                  }}
                />
              ) : (
                <TaskComp
                  task={task}
                  place={TaskPlaces.STOCK}
                  index={index}
                  updateEditing={updateEditing}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </ContainerPaper>
    )
  })
)

const ContainerPaper = styled(Paper)`
  && {
    width: 96%;
    height: 96%;
    padding: 2%;
    overflow: auto;
  }
`
