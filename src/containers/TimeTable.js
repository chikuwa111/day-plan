// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { State, Task, EditingPlace } from '../types'
import { add, update, destroy, move } from '../actions/tasks'
import { change } from '../actions/session'
import Grid from '@material-ui/core/Grid'
import Timeline from '../components/Timeline'
import TaskComp from '../components/Task'
import EmptyTask from '../components/EmptyTask'
import EditingTask from '../components/EditingTask'

type Props = {|
  begin: number,
  end: number,
  tasks: Array<?Task>,
  editingTask: ?Task,
  editingPlace: EditingPlace,
  editingIndex: number,
  add: number => void,
  update: (number, Task) => void,
  destroy: number => void,
  move: (Task, EditingPlace, number, EditingPlace, number) => void,
  changeEditing: (EditingPlace, number) => void,
|}

class TimeTable extends React.PureComponent<Props> {
  render() {
    const {
      begin,
      end,
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
      <Container>
        <GridWrapper container>
          <Grid
            item
            xs={2}
            sm={1}
            onClick={() => {
              changeEditing(null, 999)
            }}
          >
            <Timeline begin={begin} end={end} />
          </Grid>
          <Grid item xs={10} sm={11}>
            <MarginDiv />
            {tasks.map((task, index, tasks) => {
              if (task == null) {
                return (
                  <EmptyTask
                    key={index}
                    onClick={() => {
                      add(index)
                    }}
                    onMove={
                      editingTask &&
                      (() => {
                        move(
                          editingTask,
                          editingPlace,
                          editingIndex,
                          'TimeTable',
                          index
                        )
                      })
                    }
                  />
                )
              } else if (
                editingPlace === 'TimeTable' &&
                editingIndex === index
              ) {
                let maxLength = task.length
                tasks.slice(index + 1).every(behindTask => {
                  if (behindTask == null) {
                    maxLength += 30
                    return true
                  }
                  return false
                })
                return (
                  <EditingTask
                    key={task.id}
                    task={task}
                    maxLength={maxLength}
                    onChange={(task: Task) => {
                      update(index, task)
                    }}
                    onDestroy={() => {
                      destroy(index)
                    }}
                  />
                )
              } else {
                return (
                  <TaskComp
                    key={task.id}
                    task={task}
                    onClick={() => {
                      changeEditing('TimeTable', index)
                    }}
                  />
                )
              }
            })}
          </Grid>
        </GridWrapper>
      </Container>
    )
  }
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
)(TimeTable)
