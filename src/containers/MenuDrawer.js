// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import pure from 'recompose/pure'
import type { State, Plan } from '../types'
import { addPlan, switchPlan } from '../actions/plan'
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

  plans: { [id: string]: Plan },
  active: string,
  addPlan: () => void,
  switchPlan: string => void,
|}

const mapStateToProps = (state: State) => ({
  plans: state.condition.plans,
  active: state.session.activePlanId,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ addPlan, switchPlan }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  pure(function MenuDrawer(props: Props) {
    const { open, onClose, plans, active, addPlan, switchPlan } = props

    return (
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Container onClick={onClose}>
          <List>
            <ListItem button onClick={addPlan}>
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
            {Object.keys(plans)
              .filter(id => id !== active)
              .map(id => (
                <ListItem
                  button
                  key={id}
                  onClick={() => {
                    switchPlan(id)
                  }}
                >
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <EllipsisTypography>{plans[id].title}</EllipsisTypography>
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
