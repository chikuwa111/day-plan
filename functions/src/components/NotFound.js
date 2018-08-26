// @flow
import * as React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

export default function NotFound() {
  return (
    <Container>
      <FixedTypography variant="display4">404 NOT FOUND</FixedTypography>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const FixedTypography = styled(Typography)`
  text-align: center;
`
