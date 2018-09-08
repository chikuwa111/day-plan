// @flow
import localforage from 'localforage'
import throttle from 'lodash/throttle'
import { newPlan } from '../lib/task'
import type { Action } from '../actions'
import type {
  State,
  SessionState,
  StockState,
  PlanState,
  PlanList,
} from '../types'

const mainStorage = localforage.createInstance({ name: 'main' })
const planStorage = localforage.createInstance({ name: 'plan' })

const persistState = throttle(store => {
  const state: State = store.getState()
  Promise.all([
    mainStorage.setItem('session', state.session),
    mainStorage.setItem('stock', state.stock),
    planStorage.setItem(state.session.activePlanId, state.plan),
  ])
}, 1000)

export const storageMiddleware = (store: any) => (next: Action => void) => (
  action: Action
) => {
  next(action)
  persistState(store)
}

export const fetchData = async (): Promise<{|
  session: ?SessionState,
  stock: ?StockState,
  plan: ?PlanState,
|}> => {
  try {
    // Migrate from redux-persist
    const persistedData = localStorage.getItem('persist:root')
    if (persistedData) {
      const { plans, stock } = JSON.parse(persistedData)
      const serializedPlans = JSON.parse(plans)
      const serializedStock = JSON.parse(stock)
      await Promise.all([
        ...Object.keys(serializedPlans.plans).map(id =>
          planStorage.setItem(id, serializedPlans.plans[id])
        ),
        mainStorage.setItem('session', {
          activePlanId: serializedPlans.active,
        }),
        mainStorage.setItem('stock', serializedStock),
      ])
      localStorage.removeItem('persist:root')
    }

    const [session, stock] = await Promise.all([
      mainStorage.getItem('session'),
      mainStorage.getItem('stock'),
    ])
    const plan =
      session && session.activePlanId
        ? await planStorage.getItem(session.activePlanId)
        : null

    return { session, stock, plan }
  } catch (err) {
    return { session: null, stock: null, plan: null }
  }
}

export const fetchPlanList = async (): Promise<PlanList> => {
  let plans = []
  try {
    await planStorage.iterate((plan, id) => {
      plans = [...plans, { id, title: plan.title }]
    })
    return plans
  } catch (err) {
    return plans
  }
}

export const fetchPlan = async (id: string): Promise<PlanState> => {
  try {
    return await planStorage.getItem(id)
  } catch (err) {
    return newPlan()
  }
}
