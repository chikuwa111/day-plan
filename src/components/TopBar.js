// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'

export default pure(function TopBar() {
  return (
    <AppBarContainer>
      <Toolbar>
        <LeftIconButton color="inherit">
          <MenuIcon />
        </LeftIconButton>
        <FlexTypography variant="title" color="inherit">
          Title
        </FlexTypography>
        <RightIconButton color="inherit">
          <SettingsIcon />
        </RightIconButton>
      </Toolbar>
    </AppBarContainer>
  )
})

const AppBarContainer = styled(AppBar)`
  flex-grow: 1;
`

const LeftIconButton = styled(IconButton)`
  && {
    margin-left: -12px;
    margin-right: 20px;
  }
`

const RightIconButton = styled(IconButton)`
  && {
    margin-right: -12px;
  }
`

const FlexTypography = styled(Typography)`
  flex: 1;
`
