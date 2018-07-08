// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import type { Plan } from '../types'
import { TimeRange } from '../constants'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'

type Props = {|
  open: boolean,
  onClose: () => void,
  plan: Plan,
  updateTitle: string => void,
  updateTime: ('start' | 'end', number) => void,
|}

export default pure(function Dialog(props: Props) {
  const { open, onClose, plan, updateTitle, updateTime } = props
  const { title, start, end, tasks } = plan

  const disableMinusStart = start <= TimeRange.min
  const disablePlusStart = tasks.slice(0, 2).some(task => task != null)
  const disableMinusEnd = tasks.slice(-2).some(task => task != null)
  const disablePlusEnd = TimeRange.max <= end

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Settings</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={e => {
            updateTitle(e.target.value)
          }}
        />
        <MarginDiv />
        <TimeChanger
          name={'start'}
          time={start}
          updateTime={updateTime}
          disableMinus={disableMinusStart}
          disablePlus={disablePlusStart}
        />
        <TimeChanger
          name={'end'}
          time={end}
          updateTime={updateTime}
          disableMinus={disableMinusEnd}
          disablePlus={disablePlusEnd}
        />
      </DialogContent>
    </Dialog>
  )
})

const MarginDiv = styled.div`
  height: 16px;
`

type TimeChangerProps = {|
  name: 'start' | 'end',
  time: number,
  updateTime: ('start' | 'end', number) => void,
  disableMinus: boolean,
  disablePlus: boolean,
|}

const TimeChanger = pure(function TimeChanger(props: TimeChangerProps) {
  const { name, time, updateTime, disableMinus, disablePlus } = props
  return (
    <div>
      <Typography>{name}</Typography>
      <TimeChangerContainer>
        <IconButton
          disabled={disableMinus}
          onClick={() => updateTime(name, time - 1)}
        >
          <RemoveCircleIcon />
        </IconButton>
        <TextWrapper>{('0' + time).slice(-2)}</TextWrapper>
        <IconButton
          disabled={disablePlus}
          onClick={() => updateTime(name, time + 1)}
        >
          <AddCircleIcon />
        </IconButton>
      </TimeChangerContainer>
    </div>
  )
})

const TimeChangerContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
