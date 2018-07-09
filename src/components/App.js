// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
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
const Backend = isMobile ? TouchBackend : HTML5Backend

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

export default DragDropContext(Backend)(
  pure(function App() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
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
      </MuiThemeProvider>
    )
  })
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
  height: 0.8rem;
`
