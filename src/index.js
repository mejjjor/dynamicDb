import React from 'react'
import { render } from 'react-dom'
import firebase from "firebase"

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from 'redux'
import createLogger from "redux-logger"

import reducers from 'reducers'
import App from "containers/App"
import {
  signInFirebase,
  signOutFirebase } from "actions"


const logger = createLogger()

const middleware = [ logger ]

const store = createStore(reducers, applyMiddleware(...middleware))

const config = {
  apiKey: "AIzaSyARJdrwUEsyGoCPA1ytt2Dh4db1hefqdA8",
  authDomain: "utopia-b4c8d.firebaseapp.com",
  databaseURL: "https://utopia-b4c8d.firebaseio.com",
  storageBucket: "utopia-b4c8d.appspot.com",
}
firebase.initializeApp(config)

firebase.auth().onAuthStateChanged( (user) => {
    if (user) {
      store.dispatch(signInFirebase(user))
    } else {
      store.dispatch(signOutFirebase())
    }
  }, (error) => {
    console.log(error)
  })

render((
  <Provider store={ store }>
    <App />
  </Provider>
  ), document.getElementById('root'))
