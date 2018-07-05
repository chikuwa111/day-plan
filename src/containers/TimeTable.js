// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { State, Task } from '../types'
import { add, update, destroy } from '../actions/tasks'
import Grid from '@material-ui/core/Grid'
import Timeline from '../components/Timeline'
import TaskComp from '../components/Task'
import EmptyTask from '../components/EmptyTask'
import EditingTask from '../components/EditingTask'

type Props = {|
  begin: number,
  end: number,
  tasks: Array<?Task>,
  add: number => void,
  update: (number, Task) => void,
  destroy: number => void,
|}

type TimeTableState = {|
  editingIndex: ?number,
|}

class TimeTable extends React.PureComponent<Props, TimeTableState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      editingIndex: null,
    }
  }

  changeEditing = (editingIndex: ?number) => {
    this.setState({ editingIndex })
  }

  render() {
    const { begin, end, tasks, add, update, destroy } = this.props
    const { editingIndex } = this.state

    return (
      <Container>
        <GridWrapper container>
          <Grid
            item
            xs={2}
            sm={1}
            onClick={() => {
              this.changeEditing(null)
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
                      this.changeEditing(index)
                    }}
                  />
                )
              } else if (editingIndex !== index) {
                return (
                  <TaskComp
                    key={task.id}
                    task={task}
                    onClick={() => {
                      this.changeEditing(index)
                    }}
                  />
                )
              } else {
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
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ add, update, destroy }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeTable)
