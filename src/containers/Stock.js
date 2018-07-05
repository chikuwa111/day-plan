// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { State, Task, EditingPlace } from '../types'
import { add, update, destroy } from '../actions/stock'
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
  changeEditing: (EditingPlace, number) => void,
|}

class Stock extends React.PureComponent<Props> {
  render() {
    const {
      tasks,
      editingIndex,
      add,
      update,
      destroy,
      changeEditing,
    } = this.props

    return (
      <ContainerPaper>
        <Grid container direction="column" spacing={8}>
          <EmptyTask
            onClick={() => {
              add()
              changeEditing('Stock', 0)
            }}
          />
          {tasks.map((task, index) => (
            <Grid item key={task.id}>
              {editingIndex !== index ? (
                <TaskComp
                  task={task}
                  onClick={() => {
                    changeEditing('Stock', index)
                  }}
                />
              ) : (
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
    state.session.editingPlace === 'Stock' ? state.session.editingIndex : null,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ add, update, destroy }, dispatch),
  changeEditing: (editingPlace: EditingPlace, editingIndex: number) => {
    dispatch(change(editingPlace, editingIndex))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stock)
