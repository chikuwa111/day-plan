// @flow
import * as React from 'react'
import type { Plan } from '../../../src/types'

type Props = {|
  plan: ?Plan,
|}

export default function App(props: Props) {
  const { plan } = props

  return <div>dummy</div>
}
