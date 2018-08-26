// @flow
import * as React from 'react'
import styled from 'styled-components'

type Props = {|
  start: number,
  end: number,
|}

export default function Timeline(props: Props) {
  const { start, end } = props
  const length = end - start
  const timelineArray = Array.from({ length }, (_, i) => start + i)

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
}

const Line = styled.div`
  height: 2rem;
  text-align: right;
`
