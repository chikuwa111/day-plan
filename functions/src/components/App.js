// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import type { Plan } from '../../../src/types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'
import CssBaseline from '@material-ui/core/CssBaseline'
import TopBar from '../components/TopBar'
import TimeTable from '../components/TimeTable'
import NotFound from '../components/NotFound'

type Props = {|
  plan: ?Plan,
|}

export default pure(function App(props: Props) {
  const { plan } = props

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar title={plan != null ? plan.title : '404 NOTFOUND'} />
      {plan == null ? <NotFound /> : <TimeTable plan={plan} />}
    </MuiThemeProvider>
  )
})

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
