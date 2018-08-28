// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { Plan } from '../../../src/types'
import CssBaseline from '@material-ui/core/CssBaseline'
import TopBar from '../components/TopBar'
import TimeTable from '../components/TimeTable'
import NotFound from '../components/NotFound'

type Props = {|
  planId: string,
  plan: ?Plan,
|}

export default function App(props: Props) {
  const { planId, plan } = props

  return (
    <React.Fragment>
      <CssBaseline />
      <TopBar planId={planId} plan={plan} />
      <Container>
        {plan == null ? <NotFound /> : <TimeTable plan={plan} />}
      </Container>
    </React.Fragment>
  )
}

const Container = styled.div`
  height: 100%;
  padding-top: 56px;
  @media (min-width: 600px) {
    padding-top: 64px;
  }
`
