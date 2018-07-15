// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { Task } from '../types'
import { Colors, TimeLengths } from '../constants'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import ScheduleIcon from '@material-ui/icons/Schedule'
import ColorLensIcon from '@material-ui/icons/ColorLens'
import DeleteIcon from '@material-ui/icons/Delete'

type Props = {|
  task: Task,
  maxLength: ?number,
  onChange: Task => void,
  onDestroy: () => void,
  closeEditing: () => void,
|}

export default class EditingTask extends React.PureComponent<Props> {
  container: ?HTMLElement

  handleClick = (e: MouseEvent | TouchEvent) => {
    // FIXME flow
    const target: any = e.target
    const container = this.container
    if (container && !container.contains(target)) this.props.closeEditing()
  }

  componentDidMount() {
    document.addEventListener('touchend', this.handleClick, true)
    document.addEventListener('click', this.handleClick, true)
  }
  componentWillUnmount() {
    document.removeEventListener('touchend', this.handleClick, true)
    document.removeEventListener('click', this.handleClick, true)
  }

  render() {
    const { task, maxLength, onChange, onDestroy, closeEditing } = this.props

    const availableLengths =
      maxLength == null
        ? TimeLengths
        : TimeLengths.filter(length => length <= maxLength)

    return (
      <form
        ref={container => (this.container = container)}
        onSubmit={e => {
          e.preventDefault()
          closeEditing()
        }}
      >
        <Container task={task}>
          <BodyField
            autoFocus
            value={task.body}
            onChange={e => {
              onChange({
                ...task,
                body: e.target.value,
              })
            }}
          />
          <SelectWrapper>
            <SelectIcon>
              <ScheduleIcon />
            </SelectIcon>
            <Select
              value={task.length}
              onChange={e => {
                onChange({ ...task, length: Number(e.target.value) })
              }}
            >
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
            <Select
              value={task.color}
              onChange={e => {
                onChange({ ...task, color: e.target.value })
              }}
            >
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
        <HiddenButton type="submit" />
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

const BodyField = styled(TextField)`
  && {
    width: 100%;
  }
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

const HiddenButton = styled.button`
  visibility: hidden;
  position: absolute;
`
