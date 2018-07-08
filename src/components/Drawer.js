// @flow
import * as React from 'react'
import styled from 'styled-components'
import pure from 'recompose/pure'
import DrawerComp from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddBoxIcon from '@material-ui/icons/AddBox'
import DeleteIcon from '@material-ui/icons/Delete'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import Typography from '@material-ui/core/Typography'

type Props = {|
  open: boolean,
  onClose: () => void,
  titleList: Array<string>,
  active: number,
  addPlan: () => void,
  destroyPlan: () => void,
  switchPlan: number => void,
|}

export default pure(function Drawer(props: Props) {
  const {
    open,
    onClose,
    titleList,
    active,
    addPlan,
    destroyPlan,
    switchPlan,
  } = props

  return (
    <DrawerComp anchor="left" open={open} onClose={onClose}>
      <Container onClick={onClose}>
        <List>
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
          {titleList.map(
            (title, index) =>
              index !== active && (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    switchPlan(index)
                  }}
                >
                  <ListItemIcon>
                    <BookmarkIcon />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={<EllipsisTypography>{title}</EllipsisTypography>}
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
