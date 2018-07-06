// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TaskPlaces } from '../constants'
import type { State, Task, TaskPlace } from '../types'
import { add, update, destroy, move } from '../actions/stock'
import { change } from '../actions/session'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TaskComp from '../components/Task'
import EmptyTask from '../components/EmptyTask'
import EditingTask from '../components/EditingTask'

type Props = {|
  tasks: Array<Task>,
  editingIndex: ?number,
  add: () => void,
  update: (number, Task) => void,
  destroy: number => void,
  move: (Task, TaskPlace, number, number) => void,
  changeEditing: (TaskPlace, number) => void,
|}

class Stock extends React.PureComponent<Props> {
  render() {
    const {
      tasks,
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
            place={TaskPlaces.STOCK}
            index={0}
            onClick={add}
            onDrop={move}
          />
          {tasks.map((task, index) => (
            <Grid item key={task.id}>
              {editingIndex != null && editingIndex === index ? (
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
                  place={TaskPlaces.STOCK}
                  index={index}
                  onClick={() => {
                    changeEditing(TaskPlaces.STOCK, index)
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
  editingIndex:
    state.session.editing.place === TaskPlaces.STOCK
      ? state.session.editing.index
      : null,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ add, update, destroy, move }, dispatch),
  changeEditing: (place: TaskPlace, index: number) => {
    dispatch(change(place, index))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stock)
