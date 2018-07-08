// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
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

export default DragDropContext(Backend)(
  pure(function App() {
    return (
      <React.Fragment>
        <CssBaseline />
        <GridWrapper container spacing={16}>
          <GridWrapper item xs={12} md={8}>
            <TimeTable />
          </GridWrapper>
          <GridWrapper item xs={12} md={4}>
            <Stock />
          </GridWrapper>
        </GridWrapper>
      </React.Fragment>
    )
  })
)

const GridWrapper = styled(Grid)`
  && {
    height: 100%;
  }
`
