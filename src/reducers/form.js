// @flow
import type { Action } from '../actions'
import type { FormState } from '../types'

const initialState: FormState = {
  body: '',
  color: '#fafafa',
  length: 30,
}

const form = (form: FormState = initialState, action: Action): FormState => {
  switch (action.type) {
    case 'FORM__CHANGE':
      return action.task
    default:
      return form
  }
}

export default form
