// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import type { State, Plan } from '../types'
import { TimeRange } from '../constants'
import { updateTime, updateTitle } from '../actions/plan'
import TimeChanger from '../components/TimeChanger'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'

type Props = {|
  open: boolean,
  onClose: () => void,

  plan: Plan,
  updateTitle: string => void,
  updateTime: ('start' | 'end', number) => void,
|}

const mapStateToProps = (state: State) => ({
  plan: state.plans.plans[state.plans.active],
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateTime, updateTitle }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  pure(function SettingDialog(props: Props) {
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
          <Typography>title</Typography>
          <Input
            fullWidth
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
)

const MarginDiv = styled.div`
  height: 16px;
`
