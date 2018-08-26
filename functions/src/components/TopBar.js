// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

type Props = {|
  title: string,
|}

export default pure(function TopBar(props: Props) {
  const { title } = props

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="title" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
})
