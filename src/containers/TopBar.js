// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { State, PlansState } from '../types'
import {
  addPlan,
  destroyPlan,
  switchPlan,
  updateTitle,
  updateTime,
} from '../actions/plan'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'
import Drawer from '../components/Drawer'
import Dialog from '../components/Dialog'

type Props = {|
  plans: PlansState,
  addPlan: () => void,
  destroyPlan: () => void,
  switchPlan: string => void,
  updateTitle: string => void,
  updateTime: ('start' | 'end', number) => void,
|}

type TopBarState = {|
  drawerOpen: boolean,
  dialogOpen: boolean,
|}

const mapStateToProps = (state: State) => ({
  plans: state.plans,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    { addPlan, destroyPlan, switchPlan, updateTitle, updateTime },
    dispatch
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class TopBar extends React.PureComponent<Props, TopBarState> {
    constructor(props: Props) {
      super(props)
      this.state = {
        drawerOpen: false,
        dialogOpen: false,
      }
    }

    toggleDrawer = (drawerOpen: boolean) => () => {
      this.setState({ drawerOpen })
    }

    toggleDialog = (dialogOpen: boolean) => () => {
      this.setState({ dialogOpen })
    }

    render() {
      const {
        plans: plansState,
        addPlan,
        destroyPlan,
        switchPlan,
        updateTitle,
        updateTime,
      } = this.props
      const { plans, active } = plansState
      const activePlan = plans[active]
      const { drawerOpen, dialogOpen } = this.state

      return (
        <div>
          <AppBarContainer>
            <Toolbar>
              <LeftIconButton color="inherit" onClick={this.toggleDrawer(true)}>
                <MenuIcon />
              </LeftIconButton>
              <FlexTypography variant="title" color="inherit">
                {activePlan.title}
              </FlexTypography>
              <RightIconButton
                color="inherit"
                onClick={this.toggleDialog(true)}
              >
                <SettingsIcon />
              </RightIconButton>
            </Toolbar>
          </AppBarContainer>
          <Drawer
            open={drawerOpen}
            onClose={this.toggleDrawer(false)}
            plans={plans}
            active={active}
            addPlan={addPlan}
            destroyPlan={destroyPlan}
            switchPlan={switchPlan}
          />
          <Dialog
            open={dialogOpen}
            onClose={this.toggleDialog(false)}
            plan={activePlan}
            updateTitle={updateTitle}
            updateTime={updateTime}
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
