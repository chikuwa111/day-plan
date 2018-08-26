// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import type { Plan } from '../../../src/types'
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
    <React.Fragment>
      <CssBaseline />
      <TopBar plan={plan} />
      <Container>
        {plan == null ? <NotFound /> : <TimeTable plan={plan} />}
      </Container>
    </React.Fragment>
  )
})

const Container = styled.div`
  height: 100%;
  padding-top: 56px;
  @media (min-width: 600px) {
    padding-top: 64px;
  }
`
