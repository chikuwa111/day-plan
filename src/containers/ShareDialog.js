// @flow
import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { createPlan, updatePlan } from '../lib/firestore'
import type { State, Plan } from '../types'
import { updateCloudId } from '../actions/plan'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckIcon from '@material-ui/icons/Check'

type Props = {|
  open: boolean,
  onClose: () => void,

  plan: Plan,
  updateCloudId: string => void,
|}

type ShareDialogState = {|
  uploadState: '' | 'uploading' | 'success' | 'failure',
|}

const mapStateToProps = (state: State) => ({
  plan: state.plans.plans[state.plans.active],
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateCloudId }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class ShareDialog extends React.PureComponent<Props, ShareDialogState> {
    constructor(props: Props) {
      super(props)
      this.state = { uploadState: '' }
    }

    onEnter = () => {
      this.setState({ uploadState: '' })
    }

    onShare = () => {
      this.setState({ uploadState: 'uploading' })

      const { plan, updateCloudId } = this.props

      if (plan.cloudId) {
        updatePlan(plan)
          .then(() => {
            this.setState({ uploadState: 'success' })
          })
          .catch(_err => {
            this.setState({ uploadState: 'failure' })
          })
        return
      }

      createPlan(plan)
        .then(docRef => {
          this.setState({ uploadState: 'success' })
          updateCloudId(docRef.id)
        })
        .catch(_err => {
          this.setState({ uploadState: 'failure' })
        })
    }

    render() {
      const { open, onClose, plan } = this.props
      const { uploadState } = this.state

      const shared = plan.cloudId != null

      return (
        <Dialog open={open} onEnter={this.onEnter} onClose={onClose}>
          <DialogTitle>Share</DialogTitle>
          <DialogContent>
            {uploadState === 'failure' && (
              <Typography color="error">
                Sorry, something went wrong. Please retry later.
              </Typography>
            )}
            {shared ? (
              <React.Fragment>
                <Typography>ID: {plan.cloudId}</Typography>
                <Typography>
                  * You need to update manually to reflect changes after
                  sharing.
                </Typography>
              </React.Fragment>
            ) : (
              <Typography>This plan is not shared yet.</Typography>
            )}
            <MarginDiv />
            <ButtonWrapper>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onShare}
                disabled={['uploading', 'success'].includes(uploadState)}
              >
                {uploadState === 'success' ? (
                  <CheckIcon size={24} color="secondary" />
                ) : shared ? (
                  'UPDATE'
                ) : (
                  'SHARE'
                )}
              </Button>
              {uploadState === 'uploading' && (
                <ButtonProgress size={24} color="secondary" />
              )}
            </ButtonWrapper>
          </DialogContent>
        </Dialog>
      )
    }
  }
)

const MarginDiv = styled.div`
  height: 16px;
`

const ButtonWrapper = styled.div`
  display: inline-block;
  position: relative;
`

const ButtonProgress = styled(CircularProgress)`
  & {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -12px;
  }
`
