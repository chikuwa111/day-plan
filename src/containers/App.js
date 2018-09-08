// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import { fetchData } from '../lib/storage'
import { initStore } from '../actions'
import type { State } from '../types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Loading from '../components/Loading'
import TopBar from '../containers/TopBar'
import TimeTable from '../containers/TimeTable'
import Stock from '../containers/Stock'

const isMobile = (() => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  if (userAgent.indexOf('iphone') !== -1) return true
  if (userAgent.indexOf('ipad') !== -1) return true
  if (userAgent.indexOf('android') !== -1) return true
  return false
})()
const Backend = isMobile ? TouchBackend({ delayTouchStart: 200 }) : HTML5Backend

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[300],
      main: blueGrey[600],
      dark: blueGrey[900],
      contrastText: '#fff',
    },
  },
})

type Props = {|
  loading: boolean,
  initStore: () => void,
|}

const mapStateToProps = (state: State) => ({
  loading: state.condition.loading,
})
const mapDispatchToProps = dispatch => ({ dispatch })
const mergeProps = (state, { dispatch }, ownProps): Props => ({
  loading: state.loading,
  initStore: () => {
    fetchData().then(({ session, stock, plan }) => {
      dispatch(initStore(session, stock, plan))
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(
  DragDropContext(Backend)(
    class App extends React.PureComponent<Props> {
      componentDidMount() {
        this.props.initStore()
      }

      render() {
        const { loading } = this.props
        return (
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {loading ? (
              <Loading />
            ) : (
              <React.Fragment>
                <TopBar />
                <RootGrid container spacing={16}>
                  <GridWrapper item xs={12} sm={8}>
                    <TimeTable />
                  </GridWrapper>
                  <Hidden xsDown>
                    <GridWrapper item xs={12} sm={4}>
                      <MarginDiv />
                      <Stock />
                    </GridWrapper>
                  </Hidden>
                </RootGrid>
              </React.Fragment>
            )}
          </MuiThemeProvider>
        )
      }
    }
  )
)

const RootGrid = styled(Grid)`
  height: 100%;
  padding-top: 56px;
  @media (min-width: 600px) {
    padding-top: 64px;
  }
`

const GridWrapper = styled(Grid)`
  && {
    height: 100%;
  }
`

const MarginDiv = styled.div`
  height: 1.6rem;
`
