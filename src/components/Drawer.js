// @flow
import * as React from 'react'
import styled from 'styled-components'
import pure from 'recompose/pure'
import type { Plan } from '../types'
import { createPlan, updatePlan, deletePlan } from '../lib/firestore'
import DrawerComp from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ShareIcon from '@material-ui/icons/Share'
import CancelIcon from '@material-ui/icons/Cancel'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteIcon from '@material-ui/icons/Delete'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Typography from '@material-ui/core/Typography'

type Props = {|
  open: boolean,
  onClose: () => void,
  plans: { [id: string]: Plan },
  active: string,
  updateCloudId: (?string) => void,
  addPlan: () => void,
  destroyPlan: () => void,
  switchPlan: string => void,
|}

export default pure(function Drawer(props: Props) {
  const {
    open,
    onClose,
    plans,
    active,
    updateCloudId,
    addPlan,
    destroyPlan,
    switchPlan,
  } = props

  const activePlan = plans[active]
  const shared = activePlan.cloudId != null

  const onShareClick = () => {
    createPlan(activePlan)
      .then(docRef => {
        updateCloudId(docRef.id)
      })
      .catch(err => {
        console.error('Error creating plan: ', err)
      })
  }
  const onUpdateClick = () => {
    updatePlan(activePlan).catch(err => {
      console.error('Error updating plan: ', err)
    })
  }
  const onCancelClick = () => {
    deletePlan(activePlan)
      .then(() => {
        updateCloudId(null)
      })
      .catch(err => {
        console.error('Error destroying plan: ', err)
      })
  }

  return (
    <DrawerComp anchor="left" open={open} onClose={onClose}>
      <Container onClick={onClose}>
        <List subheader={<ListSubheader component="div">Share</ListSubheader>}>
          {shared ? (
            <React.Fragment>
              <ListItem button onClick={onUpdateClick}>
                <ListItemIcon>
                  <ShareIcon />
                </ListItemIcon>
                <ListItemText primary="Update" />
              </ListItem>
              <ListItem button onClick={onCancelClick}>
                <ListItemIcon>
                  <CancelIcon />
                </ListItemIcon>
                <ListItemText primary="Cancel" />
              </ListItem>
            </React.Fragment>
          ) : (
            <ListItem button onClick={onShareClick}>
              <ListItemIcon>
                <ShareIcon />
              </ListItemIcon>
              <ListItemText primary="Share" />
            </ListItem>
          )}
        </List>
        <Divider />
        <List subheader={<ListSubheader component="div">Plan</ListSubheader>}>
          <ListItem button onClick={addPlan}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="New plan" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              if (window.confirm('Are you sure to delete this plan?'))
                destroyPlan()
            }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete plan" />
          </ListItem>
        </List>
        <Divider />
        <List
          subheader={<ListSubheader component="div">Other plans</ListSubheader>}
        >
          {Object.keys(plans).map(
            id =>
              id !== active && (
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
              )
          )}
        </List>
      </Container>
    </DrawerComp>
  )
})

const Container = styled.div`
  width: 250px;
`

const EllipsisTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
