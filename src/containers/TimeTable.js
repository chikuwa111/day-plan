// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { TaskPlaces } from '../constants'
import type { State, Task, TaskPlace } from '../types'
import { addTask, updateTask, destroyTask } from '../actions/task'
import { changeEditing } from '../actions/session'
import Grid from '@material-ui/core/Grid'
import Timeline from '../components/Timeline'
import TaskComp from '../components/Task'
import EmptyTask from '../components/EmptyTask'
import EditingTask from '../components/EditingTask'

type Props = {|
  start: number,
  end: number,
  tasks: Array<?Task>,
  editingIndex: number,
  addTask: number => void,
  updateTask: (number, Task) => void,
  destroyTask: number => void,
  changeEditing: (TaskPlace, number) => void,
|}

const mapStateToProps = (state: State) => {
  const plan = state.plans.plans[state.plans.active]
  return {
    start: plan.start,
    end: plan.end,
    tasks: plan.tasks,
    editingIndex:
      state.session.editing.place === TaskPlaces.TIMETABLE
        ? state.session.editing.index
        : null,
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    { addTask, updateTask, destroyTask, changeEditing },
    dispatch
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  pure(function TimeTable(props: Props) {
    const {
      start,
      end,
      tasks,
      editingIndex,
      addTask,
      updateTask,
      destroyTask,
      changeEditing,
    } = props

    const closeEditing = () => {
      changeEditing(null, -1)
    }

    return (
      <Container>
        <MarginDiv />
        <GridWrapper container>
          <Grid item xs={2} sm={1} onClick={closeEditing}>
            <Timeline start={start} end={end} />
          </Grid>
          <Grid item xs={10} sm={11}>
            <MarginDiv />
            {tasks.map((task, index) => {
              if (task == null) {
                return (
                  <EmptyTask
                    key={index}
                    place={TaskPlaces.TIMETABLE}
                    index={index}
                    onClick={() => {
                      addTask(index)
                    }}
                  />
                )
              } else if (editingIndex != null && editingIndex === index) {
                let maxLength = task.length
                tasks.slice(index + 1).every(behindTask => {
                  if (behindTask == null) {
                    maxLength += 30
                    return maxLength < 120
                  }
                  return false
                })
                return (
                  <EditingTask
                    key={task.id}
                    task={task}
                    maxLength={maxLength}
                    onChange={(task: Task) => {
                      updateTask(index, task)
                    }}
                    onDestroy={() => {
                      destroyTask(index)
                    }}
                    closeEditing={closeEditing}
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
  })
)

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
  height: 0.8rem;
`
