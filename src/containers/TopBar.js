// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { State } from '../types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import ShareIcon from '@material-ui/icons/Share'
import SettingsIcon from '@material-ui/icons/Settings'
import MenuDrawer from '../containers/MenuDrawer'
import SettingDialog from '../containers/SettingDialog'
import ShareDialog from '../containers/ShareDialog'

type Props = {|
  title: string,
|}

type TopBarState = {|
  drawerOpen: boolean,
  openDialog: '' | 'setting' | 'share',
|}

const mapStateToProps = (state: State) => ({
  title: state.plan.title,
})

export default connect(mapStateToProps)(
  class TopBar extends React.PureComponent<Props, TopBarState> {
    constructor(props: Props) {
      super(props)
      this.state = {
        drawerOpen: false,
        openDialog: '',
      }
    }

    toggleDrawer = (drawerOpen: boolean) => () => {
      this.setState({ drawerOpen })
    }

    toggleDialog = (openDialog: '' | 'setting' | 'share') => () => {
      this.setState({ openDialog })
    }

    render() {
      const { title } = this.props
      const { drawerOpen, openDialog } = this.state

      return (
        <div>
          <AppBarContainer>
            <Toolbar>
              <LeftIconButton color="inherit" onClick={this.toggleDrawer(true)}>
                <MenuIcon />
              </LeftIconButton>
              <FlexTypography variant="title" color="inherit">
                {title}
              </FlexTypography>
              <IconButton color="inherit" onClick={this.toggleDialog('share')}>
                <ShareIcon />
              </IconButton>
              <RightIconButton
                color="inherit"
                onClick={this.toggleDialog('setting')}
              >
                <SettingsIcon />
              </RightIconButton>
            </Toolbar>
          </AppBarContainer>
          <MenuDrawer open={drawerOpen} onClose={this.toggleDrawer(false)} />
          <SettingDialog
            open={openDialog === 'setting'}
            onClose={this.toggleDialog('')}
          />
          <ShareDialog
            open={openDialog === 'share'}
            onClose={this.toggleDialog('')}
          />
        </div>
      )
    }
  }
)

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
