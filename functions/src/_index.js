// @flow
// import functions from 'firebase-functions'
// import admin from 'firebase-admin'
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

// admin.initializeApp(functions.config().firebase)
// const firestore = admin.firestore()

const app = express()
app.get('/p/:id', (req, res) => {
  const id = req.params.id
  // firestore
  //   .collection('plans')
  //   .doc(id)
  //   .then(documentSnapshot => {
  //     const plan = documentSnapshot.data()
  const plan = {
    title: 'Tutorial',
    start: 8,
    end: 23,
    tasks: [
      {
        id: 'WFP1j9W',
        body: 'Day Planへようこそ！',
        color: '#80d8ff',
        length: 30,
      },
      {
        id: 'U3HMGUu',
        body: '使い方を説明します！',
        color: '#fafafa',
        length: 60,
      },
      null,
      { id: 'Zz3xfJR', body: '1. 予定の作成', color: '#ffd180', length: 30 },
      {
        id: 'RbrllCX',
        body: '薄い+の部分をタップorクリック！',
        color: '#fafafa',
        length: 30,
      },
      {
        id: 'r5RN9D8',
        body: '内容・時間・色を入力！',
        color: '#fafafa',
        length: 30,
      },
      null,
      { id: 'zWX~Uiu', body: '2. 予定の編集', color: '#ffd180', length: 30 },
      {
        id: 'lIrl_6s',
        body: '既存の予定をタップorクリック！',
        color: '#fafafa',
        length: 30,
      },
      {
        id: '0uyuhR0',
        body: 'あとは作成時と同様に編集！',
        color: '#fafafa',
        length: 30,
      },
      {
        id: 'EovR75j',
        body: '削除は右のゴミ箱ボタンから！',
        color: '#fafafa',
        length: 30,
      },
      null,
      { id: 'CQJWNa0', body: '3. 予定の移動', color: '#ffd180', length: 30 },
      {
        id: 'fVhbo_g',
        body: 'まずはドラッグ！',
        color: '#fafafa',
        length: 30,
      },
      {
        id: 'VO~xd1A',
        body: 'プレビューを確認してドロップ！',
        color: '#fafafa',
        length: 30,
      },
      null,
      { id: 'YilFawo', body: '4. 設定の変更', color: '#ffd180', length: 30 },
      {
        id: 'pA~0pgT',
        body: '右上の歯車をタップorクリック！',
        color: '#fafafa',
        length: 30,
      },
      {
        id: 'r8on2tS',
        body: 'タイトルと開始・終了時間を変更！',
        color: '#fafafa',
        length: 30,
      },
      null,
      { id: 'M_~rJB4', body: 'これで以上！', color: '#80d8ff', length: 30 },
      {
        id: 't9mqr~K',
        body: '左上のメニューから',
        color: '#fafafa',
        length: 30,
      },
      {
        id: 'Iwjeekn',
        body: 'New Planを選択して始めよう！',
        color: '#fafafa',
        length: 30,
      },
      null,
      { id: '4xe6ZgG', body: 'それでは、', color: '#fafafa', length: 30 },
      {
        id: '_MIk_Sk',
        body: '素敵なDay Planライフを！',
        color: '#ccff90',
        length: 60,
      },
      null,
      null,
    ],
  }
  const status = plan != null ? 200 : 404
  const title = plan != null ? plan.title : '404 NOTFOUND'

  const html = renderPage(id, title, null)

  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  res.status(status).send(html)
  // })
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
          <App plan={plan} />
        </MuiThemeProvider>
      </JssProvider>
    )
  )

  const styledComponentsStyle = sheet.getStyleTags()
  const materialUiStyle = sheetsRegistry.toString()

  const finalHtml = index
    .replace('::OG_TITLE::', id)
    .replace('::PLAN_ID::', id)
    .replace('<!-- ::TITLE:: -->', title)
    .replace('<!-- ::APP:: -->', html)
    .replace('<!-- ::STYLED_COMPONENTS_STYLE:: -->', styledComponentsStyle)
    .replace('/* ::MATERIAL_UI_STYLE */', materialUiStyle)
  return finalHtml
}

// export const ssrapp = functions.https.onRequest(app)
app.listen(5000)
