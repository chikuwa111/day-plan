// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TaskPlaces } from '../constants'
import type { State, Task, TaskPlace } from '../types'
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
  editingIndex: number,
  add: number => void,
  update: (number, Task) => void,
  destroy: number => void,
  move: (Task, TaskPlace, number, TaskPlace, number) => void,
  changeEditing: (TaskPlace, number) => void,
|}

class TimeTable extends React.PureComponent<Props> {
  render() {
    const {
      begin,
      end,
      tasks,
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
                    place={TaskPlaces.TIMETABLE}
                    index={index}
                    onClick={() => {
                      add(index)
                    }}
                    onDrop={move}
                  />
                )
              } else if (editingIndex != null && editingIndex === index) {
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
                    place={TaskPlaces.TIMETABLE}
                    index={index}
                    task={task}
                    onClick={() => {
                      changeEditing(TaskPlaces.TIMETABLE, index)
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
  editingIndex:
    state.session.editing.place === TaskPlaces.TIMETABLE
      ? state.session.editing.index
      : null,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ add, update, destroy, move }, dispatch),
  changeEditing: (editingPlace: TaskPlace, editingIndex: number) => {
    dispatch(change(editingPlace, editingIndex))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeTable)
