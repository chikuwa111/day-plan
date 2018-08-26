// @flow
import * as React from 'react'
import styled from 'styled-components'
import type { Plan } from '../../../src/types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import LaunchIcon from '@material-ui/icons/Launch'

type Props = {|
  plan: ?Plan,
|}

export default function TopBar(props: Props) {
  const { plan } = props
  const title = plan != null ? plan.title : 'NOT FOUND'
  const encodedTitle = encodeURI(title)
  const shareUrl =
    plan == null || plan.cloudId == null
      ? ''
      : `https://day-plan.app/p/${plan.cloudId}`
  const disableShare = plan == null

  return (
    <div>
      <AppBarContainer>
        <Toolbar>
          <FlexTypography variant="title" color="inherit">
            {title}
          </FlexTypography>
          <IconButton
            color="inherit"
            disabled={disableShare}
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&hashtags=DayPlan&url=${shareUrl}`}
          >
            <ShareIcon />
          </IconButton>
          <RightIconButton
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
            href="https://day-plan.app/?utm_source=view"
          >
            <LaunchIcon />
          </RightIconButton>
        </Toolbar>
      </AppBarContainer>
    </div>
  )
}

const AppBarContainer = styled(AppBar)`
  flex-grow: 1;
`

const FlexTypography = styled(Typography)`
  flex: 1;
`

const RightIconButton = styled(IconButton)`
  && {
    margin-right: -12px;
  }
`
