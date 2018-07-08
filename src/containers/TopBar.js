// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import type { State, PlansState } from '../types'
import { addPlan, switchPlan } from '../actions/plan'
import DrawerContent from '../components/DrawerContent'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'
import Drawer from '@material-ui/core/Drawer'

type Props = {|
  plans: PlansState,
  addPlan: () => void,
  switchPlan: number => void,
|}

type TopBarState = {|
  drawerOpen: boolean,
|}

const mapStateToProps = (state: State) => ({
  plans: state.plans,
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ addPlan, switchPlan }, dispatch),
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
      }
    }

    toggleDrawer = (drawerOpen: boolean) => () => {
      this.setState({ drawerOpen })
    }

    render() {
      const { plans: plansState, addPlan, switchPlan } = this.props
      const { plans, active } = plansState
      const activePlan = plans[active]
      const { drawerOpen } = this.state

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
              <RightIconButton color="inherit">
                <SettingsIcon />
              </RightIconButton>
            </Toolbar>
          </AppBarContainer>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={this.toggleDrawer(false)}
          >
            <DrawerContent
              titleList={plans.map(plan => plan.title)}
              active={active}
              addPlan={addPlan}
              switchPlan={switchPlan}
              closeDrawer={this.toggleDrawer(false)}
            />
          </Drawer>
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
