// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { Task } from '../types'
import { Colors, TimeLengths } from '../constants'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import TimerIcon from '@material-ui/icons/Timer'
import ColorLensIcon from '@material-ui/icons/ColorLens'
import DeleteIcon from '@material-ui/icons/Delete'

type Props = {|
  task: Task,
  maxLength: ?number,
  onChange: Task => void,
  onDestroy: () => void,
|}

type State = {|
  menuType: 'color' | 'length' | '',
  menuElement: ?HTMLElement,
|}

export default class EditableTask extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      menuType: '',
      menuElement: null,
    }
  }

  openMenu = (el: HTMLElement, type: 'color' | 'length') => {
    this.setState({
      menuType: type,
      menuElement: el,
    })
  }
  closeMenu = () => {
    this.setState({
      menuType: '',
      menuElement: null,
    })
  }

  render() {
    const { menuType, menuElement } = this.state
    const { task, maxLength, onChange, onDestroy } = this.props

    return (
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
        <IconButton
          onClick={e => {
            this.openMenu(e.currentTarget, 'length')
          }}
        >
          <TimerIcon />
        </IconButton>
        <Menu
          open={menuType === 'length'}
          anchorEl={menuElement}
          onClose={this.closeMenu}
        >
          {TimeLengths.map(
            length =>
              (maxLength == null || length <= maxLength) && (
                <MenuItem
                  key={length}
                  selected={task.length === length}
                  onClick={() => {
                    onChange({
                      ...task,
                      length,
                    })
                    this.closeMenu()
                  }}
                >
                  {length}
                </MenuItem>
              )
          )}
        </Menu>
        <IconButton
          onClick={e => {
            this.openMenu(e.currentTarget, 'color')
          }}
        >
          <ColorLensIcon />
        </IconButton>
        <Menu
          open={menuType === 'color'}
          anchorEl={menuElement}
          onClose={this.closeMenu}
        >
          {Colors.map(color => (
            <ColorMenuItem
              color={color}
              key={color}
              onClick={() => {
                onChange({
                  ...task,
                  color,
                })
                this.closeMenu()
              }}
            >
              {task.color === color && '✔︎'}
            </ColorMenuItem>
          ))}
        </Menu>
        <IconButton>
          <DeleteIcon onClick={onDestroy} />
        </IconButton>
      </Container>
    )
  }
}

const Container = styled(Card)`
  && {
    width: 100%;
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

const ColorMenuItem = styled(MenuItem)`
  && {
    background-color: ${props => props.color};
    &:hover {
      background-color: ${props => props.color};
    }
  }
`