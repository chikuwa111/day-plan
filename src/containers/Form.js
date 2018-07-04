import * as React from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import styled from 'styled-components'
import type { State, Task } from '../types'
import { Colors, TimeLengths } from '../constants'
import { change } from '../actions/form'
import { add } from '../actions/stock'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

type Props = {|
  task: Task,
  onChange: Task => void,
  onSubmit: Task => void,
|}

function Form(props: Props) {
  const { task, onChange, onSubmit } = props
  const { body, length, color } = task

  return (
    <FormPaper>
      <form
        onSubmit={(e: SyntheticEvent<*>) => {
          e.preventDefault()
          onSubmit(task)
        }}
      >
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <FormTextField
              placeholder="Have breakfast"
              value={body}
              onChange={(e: SyntheticInputEvent) => {
                onChange({ ...task, body: e.target.value })
              }}
            />
          </Grid>
          <Grid item>
            <ButtonContainer>
              {TimeLengths.map(v => (
                <Button
                  key={v}
                  variant="fab"
                  color={v === length ? 'primary' : 'default'}
                  mini
                  onClick={() => {
                    onChange({ ...task, length: v })
                  }}
                >
                  <TimeLengthButtonBody>{v}</TimeLengthButtonBody>
                </Button>
              ))}
            </ButtonContainer>
          </Grid>
          <Grid item>
            <ButtonContainer>
              {Colors.map(v => (
                <ColorButton
                  key={v}
                  variant="fab"
                  mini
                  backgroundColor={v}
                  onClick={() => {
                    onChange({ ...task, color: v })
                  }}
                >
                  {v === color && <ColorCheck color={v}>✔︎</ColorCheck>}
                </ColorButton>
              ))}
            </ButtonContainer>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit" color="secondary">
              ADD
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormPaper>
  )
}

const FormPaper = styled(Paper)`
  && {
    padding: 8px;
  }
`

const FormTextField = styled(TextField)`
  width: 100%;
  background-color: #fafafa;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const TimeLengthButtonBody = styled.span`
  color: white;
  font-weight: bold;
`

const ColorButton = styled(Button)`
  && {
    background-color: ${props => props.backgroundColor};
    &:hover {
      background-color: ${props => props.backgroundColor};
    }
  }
`

const ColorCheck = styled.div`
  color: black;
`

const mapStateToProps = (state: State) => ({
  task: state.form,
})

const mapDispatchToProps = dispatch => ({
  onChange: (task: Task) => {
    dispatch(change(task))
  },
  onSubmit: (task: Task) => {
    dispatch(add(task))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(pure(Form))
