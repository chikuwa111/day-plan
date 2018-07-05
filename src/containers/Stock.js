// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { State, Task } from '../types'
import { add, update, destroy } from '../actions/stock'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TaskComp from '../components/Task'
import EmptyTask from '../components/EmptyTask'
import EditingTask from '../components/EditingTask'

type Props = {|
  tasks: Array<Task>,
  add: () => void,
  update: (number, Task) => void,
  destroy: number => void,
|}

type StockState = {|
  editingIndex: ?number,
|}

class Stock extends React.PureComponent<Props, StockState> {
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
    const { tasks, add, update, destroy } = this.props
    const { editingIndex } = this.state

    return (
      <ContainerPaper>
        <Grid container direction="column" spacing={8}>
          <EmptyTask
            onClick={() => {
              add()
              this.changeEditing(0)
            }}
          />
          {tasks.map((task, index) => (
            <Grid item key={task.id}>
              {editingIndex !== index ? (
                <TaskComp
                  task={task}
                  onClick={() => {
                    this.changeEditing(index)
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
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ add, update, destroy }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stock)
