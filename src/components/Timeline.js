// @flow
import * as React from 'react'
import pure from 'recompose/pure'
import styled from 'styled-components'

type Props = {|
  begin: number,
  end: number,
|}

export default pure(function Timeline(props: Props) {
  const { begin, end } = props
  const length = end - begin
  const timelineArray = Array.from({ length }, (_, i) => begin + i)

  return (
    <div>
      {timelineArray.map(time => (
        <div key={time}>
          <Line>{`${time} -`}</Line>
          <Line>-</Line>
        </div>
      ))}
      <Line>{`${end} -`}</Line>
    </div>
  )
})

const Line = styled.div`
  height: 2rem;
  text-align: right;
`
