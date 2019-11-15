// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
// import { deletePlan } from '../lib/firebase'
import { fetchPlan, fetchPlanList, removePlan } from '../lib/storage'
import type { State, Plan } from '../types'
import { TimeRange } from '../constants'
import { updateTime, updateTitle, switchPlan, addPlan } from '../actions/plan'
import { updateLoading, updatePlanList } from '../actions/condition'
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
  onDestroy: () => void,
|}

const mapStateToProps = (state: State) => ({
  plan: state.plan,
  planList: state.condition.planList,
  activePlanId: state.session.activePlanId,
})
const mapDispatchToProps = dispatch => ({ dispatch })
const mergeProps = (state, { dispatch }, ownProps): Props => ({
  open: ownProps.open,
  onClose: ownProps.onClose,
  plan: state.plan,
  updateTitle: (title: string) => {
    dispatch(updateTitle(title))
  },
  updateTime: (name: 'start' | 'end', time: number) => {
    dispatch(updateTime(name, time))
  },
  onDestroy: () => {
    if (!window.confirm('Are you sure to delete this plan?')) return

    // if (state.plan.cloudId) deletePlan(state.plan)

    removePlan(state.activePlanId).finally(() => {
      const nextPlan = state.planList.filter(
        plan => plan.id !== state.activePlanId
      )[0]
      if (nextPlan) {
        dispatch(updateLoading(true))
        fetchPlan(nextPlan.id).then(plan => {
          dispatch(switchPlan(nextPlan.id, plan))
        })
      } else {
        dispatch(addPlan())
      }
      ownProps.onClose()
      setTimeout(() => {
        fetchPlanList().then(planList => {
          dispatch(updatePlanList(planList))
        })
      }, 1500)
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(
  pure(function SettingDialog(props: Props) {
    const { open, onClose, plan, updateTitle, updateTime, onDestroy } = props
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
