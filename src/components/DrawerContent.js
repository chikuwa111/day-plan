// @flow
import * as React from 'react'
import styled from 'styled-components'
import pure from 'recompose/pure'
import type { Plan } from '../types'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddBoxIcon from '@material-ui/icons/AddBox'
import BookmarkIcon from '@material-ui/icons/Bookmark'

type Props = {|
  titleList: Array<string>,
  active: number,
  addPlan: () => void,
  switchPlan: number => void,
  closeDrawer: () => void,
|}

export default pure(function DrawerContent(props: Props) {
  const { titleList, active, addPlan, switchPlan, closeDrawer } = props

  return (
    <Container onClick={closeDrawer}>
      <List>
        <ListItem button onClick={addPlan}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="New plan" />
        </ListItem>
      </List>
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
                <ListItemText primary={truncate(title)} />
              </ListItem>
            )
        )}
      </List>
    </Container>
  )
})

const Container = styled.div`
  width: 250px;
`

const truncate = (title: string) => {
  const size = 15
  if (title.length < size) return title
  return title.substring(0, size - 3) + ' ...'
}
