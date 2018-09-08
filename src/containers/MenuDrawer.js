// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import pure from 'recompose/pure'
import type { State, PlanList } from '../types'
import { addPlan, switchPlan } from '../actions/plan'
import { updateLoading, updatePlanList } from '../actions/condition'
import { fetchPlan, fetchPlanList } from '../lib/storage'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddBoxIcon from '@material-ui/icons/AddBox'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Typography from '@material-ui/core/Typography'

type Props = {|
  open: boolean,
  onClose: () => void,

  planList: PlanList,
  onClickAdd: () => void,
  onClickSwitch: string => () => void,
|}

const mapStateToProps = (state: State) => ({
  planList: state.condition.planList,
  activePlanId: state.session.activePlanId,
})
const mapDispatchToProps = dispatch => ({ dispatch })
const mergeProps = (state, { dispatch }, ownProps): Props => ({
  open: ownProps.open,
  onClose: ownProps.onClose,
  planList: state.planList.filter(plan => plan.id !== state.activePlanId),
  onClickAdd: () => {
    dispatch(addPlan())
    setTimeout(() => {
      fetchPlanList().then(planList => {
        dispatch(updatePlanList(planList))
      })
    }, 1500)
  },
  onClickSwitch: (id: string) => () => {
    dispatch(updateLoading(true))
    fetchPlan(id).then(plan => {
      dispatch(switchPlan(id, plan))
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
  pure(function MenuDrawer(props: Props) {
    const { open, onClose, planList, onClickAdd, onClickSwitch } = props

    return (
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Container onClick={onClose}>
          <List>
            <ListItem button onClick={onClickAdd}>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="New plan" />
            </ListItem>
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader component="div">Other plans</ListSubheader>
            }
          >
            {planList.map(plan => (
              <ListItem button key={plan.id} onClick={onClickSwitch(plan.id)}>
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <EllipsisTypography>{plan.title}</EllipsisTypography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Container>
      </Drawer>
    )
  })
)

const Container = styled.div`
  width: 250px;
`

const EllipsisTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
