// @flow
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import type { Plan } from '../types'

firebase.initializeApp({
  apiKey: 'AIzaSyBgpIIyMubE2RcwIzYIb0UTmRipLQdu-NI',
  authDomain: 'day-plan-app.firebaseapp.com',
  databaseURL: 'https://day-plan-app.firebaseio.com',
  projectId: 'day-plan-app',
  storageBucket: 'day-plan-app.appspot.com',
  messagingSenderId: '689483713640',
})

export const signInAnonymously = () => firebase.auth().signInAnonymously()

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

export const createPlan = (plan: Plan, userId: string) =>
  db.collection('plans').add({ ...plan, userId })

export const updatePlan = (plan: Plan, userId: string) =>
  db
    .collection('plans')
    .doc(plan.cloudId)
    .set({ ...plan, userId })

export const deletePlan = (plan: Plan) =>
  db
    .collection('plans')
    .doc(plan.cloudId)
    .delete()
