// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { Task } from '../types'
import { Colors, TimeLengths } from '../constants'
import Card from '@material-ui/core/Card'
import Input from '@material-ui/core/Input'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import ScheduleIcon from '@material-ui/icons/Schedule'
import ColorLensIcon from '@material-ui/icons/ColorLens'
import DeleteIcon from '@material-ui/icons/Delete'

type Props = {|
  task: Task,
  maxLength: ?number,
  onChange: Task => void,
  updateTaskById: Task => void,
  onDestroy: () => void,
  closeEditing: () => void,
|}

type State = {|
  // lengthは逐次更新したいためstateで管理しない
  body: string,
  color: string,
|}

export default class EditingTask extends React.PureComponent<Props, State> {
  container: ?HTMLElement

  constructor(props: Props) {
    super(props)
    this.state = {
      body: this.props.task.body,
      color: this.props.task.color,
    }
  }

  handleClick = (e: MouseEvent | TouchEvent) => {
    // FIXME flow
    const target: any = e.target
    const container = this.container
    if (container && !container.contains(target)) this.props.closeEditing()
  }

  onBodyChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ body: e.target.value })
  }

  onColorChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ color: e.target.value })
  }

  onLengthChange = (e: SyntheticInputEvent<*>) => {
    const { body, color } = this.state
    const length = Number(e.target.value)
    this.props.onChange({
      ...this.props.task,
      body,
      color,
      length,
    })
  }

  componentDidMount() {
    document.addEventListener('touchend', this.handleClick, true)
    document.addEventListener('click', this.handleClick, true)
  }
  componentWillUnmount() {
    document.removeEventListener('touchend', this.handleClick, true)
    document.removeEventListener('click', this.handleClick, true)
    this.props.updateTaskById({
      ...this.props.task,
      body: this.state.body,
      color: this.state.color,
    })
  }

  render() {
    const { task, maxLength, onDestroy, closeEditing } = this.props
    const { length } = task
    const { body, color } = this.state

    console.log('render editing task')

    const availableLengths =
      maxLength == null
        ? TimeLengths
        : TimeLengths.filter(length => length <= maxLength)

    return (
      <form
        action="" /* iOSで開くボタンを表示させるために必要 */
        ref={container => (this.container = container)}
        onSubmit={e => {
          e.preventDefault()
          closeEditing()
        }}
      >
        <Container task={task}>
          <InputWrapper>
            <Input autoFocus value={body} onChange={this.onBodyChange} />
          </InputWrapper>
          <SelectWrapper>
            <SelectIcon>
              <ScheduleIcon />
            </SelectIcon>
            <Select value={length} onChange={this.onLengthChange}>
              {availableLengths.map(length => (
                <option key={length} value={length}>
                  {length} min
                </option>
              ))}
            </Select>
          </SelectWrapper>
          <SelectWrapper>
            <SelectIcon>
              <ColorLensIcon />
            </SelectIcon>
            <Select value={color} onChange={this.onColorChange}>
              {Colors.map(([name, color]) => (
                <option key={name} value={color}>
                  {name}
                </option>
              ))}
            </Select>
          </SelectWrapper>
          <IconButton>
            <DeleteIcon onClick={onDestroy} />
          </IconButton>
        </Container>
      </form>
    )
  }
}

const Container = styled(Card)`
  && {
    width: 100%;
    padding-left: 2%;
    height: ${props => props.task.length / 15}rem;
    background-color: ${props => props.task.color};
    font-size: ${props => 0.8 + props.task.length / 150}rem;
    display: flex;
    align-items: center;
  }
`

const InputWrapper = styled.div`
  min-width: 0;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
`

const SelectWrapper = styled.div`
  position: relative;
`

const SelectIcon = styled(Icon)`
  && {
    width: 48px;
    height: 48px;
    font-size: 48px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`

const Select = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 48px;
  appearance: none;
  color: transparent;
  background: transparent;
  border: 0;
  border-radius: 0;
  cursor: pointer;
`
