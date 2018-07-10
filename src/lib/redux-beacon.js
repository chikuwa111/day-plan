// @flow
import { createMiddleware } from 'redux-beacon'
import GoogleAnalyticsGtag, {
  trackEvent,
} from '@redux-beacon/google-analytics-gtag'

const trackActionEvent = trackEvent(actionObj => {
  const [category, action] = actionObj.type.split('__')
  return {
    category,
    action,
  }
})

const generateEventMap = actionTypes =>
  actionTypes.reduce((map, type) => {
    map[type] = trackActionEvent
    return map
  }, {})

const trackingEvents = [
  'PLAN__ADD',
  'PLAN__DESTROY',
  'PLAN__SWITCH',
  'TASK__ADD',
  'TASK__DESTROY',
  'STOCK__ADD',
  'STOCK__DESTROY',
]

const eventsMap = {
  ...generateEventMap(trackingEvents),
  TASK__MOVE: trackEvent(action => ({
    category: 'TASK',
    action: 'MOVE',
    value: `${action.from} => ${action.to}`,
  })),
}

const ga = GoogleAnalyticsGtag('UA-121999817-1')
const gaMiddleware = createMiddleware(eventsMap, ga)

export default gaMiddleware
