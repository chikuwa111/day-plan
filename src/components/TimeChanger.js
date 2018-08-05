import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'

type Props = {|
  name: 'start' | 'end',
  time: number,
  updateTime: ('start' | 'end', number) => void,
  disableMinus: boolean,
  disablePlus: boolean,
|}

export default pure(function TimeChanger(props: Props) {
  const { name, time, updateTime, disableMinus, disablePlus } = props

  return (
    <div>
      <Typography>{name}</Typography>
      <TimeChangerContainer>
        <IconButton
          disabled={disableMinus}
          onClick={() => updateTime(name, time - 1)}
        >
          <RemoveCircleIcon />
        </IconButton>
        <TextWrapper>{('0' + time).slice(-2)}</TextWrapper>
        <IconButton
          disabled={disablePlus}
          onClick={() => updateTime(name, time + 1)}
        >
          <AddCircleIcon />
        </IconButton>
      </TimeChangerContainer>
    </div>
  )
})

const TimeChangerContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
