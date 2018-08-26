// @flow
import functions from 'firebase-functions'
import admin from 'firebase-admin'
import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import fs from 'fs'
import App from './components/App'

// FIXME flow
const index: any = fs.readFileSync(__dirname + '/index.html', 'utf8')

admin.initializeApp(functions.config().firebase)
const firestore = admin.firestore()

const app = express()
app.get('/p/:id', (req, res) => {
  const id = req.params.id
  firestore
    .collection('plans')
    .doc(id)
    .then(documentSnapshot => {
      const plan = documentSnapshot.data()

      const status = plan != null ? 200 : 404
      const title = plan != null ? plan.title : '404 NOTFOUND'
      const html = renderToString(<App plan={plan} />)

      const finalHtml = index
        .replace('::OG_TITLE::', id)
        .replace('::PLAN_ID::', id)
        .replace('<!-- ::TITLE:: -->', id)
        .replace('<!-- ::APP:: -->', html)

      res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
      res.status(status).send(finalHtml)
    })
})

export const ssrapp = functions.https.onRequest(app)
