// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'containers/App'
import FontFaceObserver from 'fontfaceobserver'
import 'assets/fonts/index.css'
import { Provider as ReduxProvider } from "react-redux"
import configureStore from "global/store"

export const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const fontObserver = new FontFaceObserver('defaultFont', {})

fontObserver.load()
  .then(() => {
    const body = document.body
    body && body.classList.add('fontLoaded')
  })
  .catch((event: { message: string }) => console.log(event.message))

const element = document.getElementById('root')

if (element) {
  ReactDOM.render(
    <ReduxProvider store={reduxStore}>
      <App />
    </ReduxProvider>
  , element)
}
