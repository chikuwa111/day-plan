// @flow

// importを使うと動かない
const functions = require('firebase-functions')
const admin = require('firebase-admin')

import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'
import express from 'express'
import fs from 'fs'
import App from './components/App'

// FIXME flow
const index: any = fs.readFileSync(__dirname + '/index.html', 'utf8')

admin.initializeApp(functions.config().firebase)
const firestore = admin.firestore()
firestore.settings({ timestampsInSnapshots: true })

const app = express()
app.get('/p/:id', (req, res) => {
  const id = req.params.id
  firestore
    .collection('plans')
    .doc(id)
    .get()
    .then(documentSnapshot => {
      const plan = documentSnapshot.data()
      const status = plan != null ? 200 : 404
      const title = plan != null ? plan.title : '404 NOTFOUND'

      const html = renderPage(id, title, plan)

      res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
      res.status(status).send(html)
    })
})

function renderPage(id, title, plan) {
  // for styled-components
  const sheet = new ServerStyleSheet()

  // for material-ui
  const sheetsRegistry = new SheetsRegistry()
  const sheetsManager = new Map()
  const generateClassName = createGenerateClassName()

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: blueGrey[300],
        main: blueGrey[600],
        dark: blueGrey[900],
        contrastText: '#fff',
      },
    },
  })

  const html = renderToString(
    sheet.collectStyles(
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App planId={id} plan={plan} />
        </MuiThemeProvider>
      </JssProvider>
    )
  )

  const styledComponentsStyle = sheet.getStyleTags()
  const materialUiStyle = sheetsRegistry.toString()

  const finalHtml = index
    .replace('::OG_TITLE::', title)
    .replace('::PLAN_ID::', id)
    .replace('<!-- ::TITLE:: -->', title)
    .replace('<!-- ::APP:: -->', html)
    .replace('<!-- ::STYLED_COMPONENTS_STYLE:: -->', styledComponentsStyle)
    .replace('/* ::MATERIAL_UI_STYLE */', materialUiStyle)
  return finalHtml
}

export const ssrapp = functions.https.onRequest(app)
