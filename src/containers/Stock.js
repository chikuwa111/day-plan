// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { State, Task, EditingPlace } from '../types'
import { add, update, destroy } from '../actions/stock'
import { move } from '../actions/tasks'
import { change } from '../actions/session'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TaskComp from '../components/Task'
import EmptyTask from '../components/EmptyTask'
import EditingTask from '../components/EditingTask'

type Props = {|
  tasks: Array<Task>,
  editingTask: ?Task,
  editingPlace: EditingPlace,
  editingIndex: number,
  add: () => void,
  update: (number, Task) => void,
  destroy: number => void,
  move: (Task, EditingPlace, number, EditingPlace, number) => void,
  changeEditing: (EditingPlace, number) => void,
|}

class Stock extends React.PureComponent<Props> {
  render() {
    const {
      tasks,
      editingTask,
      editingPlace,
      editingIndex,
      add,
      update,
      destroy,
      move,
      changeEditing,
    } = this.props

    return (
      <ContainerPaper>
        <Grid container direction="column" spacing={8}>
          <EmptyTask
            onClick={add}
            onMove={
              editingTask && editingPlace !== 'Stock'
                ? () => {
                    move(editingTask, editingPlace, editingIndex, 'Stock', 0)
                  }
                : null
            }
          />
          {tasks.map((task, index) => (
            <Grid item key={task.id}>
              {editingPlace === 'Stock' && editingIndex === index ? (
                <EditingTask
                  task={task}
                  maxLength={null}
                  onChange={(t: Task) => {
                    update(index, t)
                  }}
                  onDestroy={() => {
                    destroy(index)
                  }}
                />
              ) : (
                <TaskComp
                  task={task}
                  onClick={() => {
                    changeEditing('Stock', index)
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </ContainerPaper>
    )
  }
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
  editingTask:
    state.session.editingPlace === 'TimeTable'
      ? state.tasks[state.session.editingIndex]
      : state.session.editingPlace === 'Stock'
        ? state.stock[state.session.editingIndex]
        : null,
  editingPlace: state.session.editingPlace,
  editingIndex: state.session.editingIndex,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ add, update, destroy, move }, dispatch),
  changeEditing: (editingPlace: EditingPlace, editingIndex: number) => {
    dispatch(change(editingPlace, editingIndex))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stock)
