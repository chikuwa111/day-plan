// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { deletePlan } from '../lib/firestore'
import type { State, Plan } from '../types'
import { TimeRange } from '../constants'
import { updateTime, updateTitle, destroyPlan } from '../actions/plan'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TimeChanger from '../components/TimeChanger'

type Props = {|
  open: boolean,
  onClose: () => void,

  plan: Plan,
  updateTitle: string => void,
  updateTime: ('start' | 'end', number) => void,
  destroyPlan: () => void,
|}

const mapStateToProps = (state: State) => ({
  plan: state.plans.plans[state.plans.active],
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateTime, updateTitle, destroyPlan }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  pure(function SettingDialog(props: Props) {
    const { open, onClose, plan, updateTitle, updateTime, destroyPlan } = props
    const { title, start, end, tasks } = plan

    const disableMinusStart = start <= TimeRange.min
    const disablePlusStart = tasks.slice(0, 2).some(task => task != null)
    const disableMinusEnd = tasks.slice(-2).some(task => task != null)
    const disablePlusEnd = TimeRange.max <= end

    const onDestroy = () => {
      if (!window.confirm('Are you sure to delete this plan?')) return

      if (plan.cloudId) {
        deletePlan(plan)
      }
      destroyPlan()
    }

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
          <MarginDiv />
          <Button variant="contained" color="secondary" onClick={onDestroy}>
            DELETE PLAN
          </Button>
        </DialogContent>
      </Dialog>
    )
  })
)

const MarginDiv = styled.div`
  height: 16px;
`
