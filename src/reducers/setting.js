// @flow
import type { Action } from '../actions'
import type { SettingState } from '../types'

const initialState: SettingState = {
  title: 'No title',
  begin: 10,
  end: 22,
}

const setting = (
  setting: SettingState = initialState,
  action: Action
): SettingState => {
  switch (action.type) {
    default:
      return setting
  }
}

export default setting
