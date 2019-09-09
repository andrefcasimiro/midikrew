// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'containers/App'
import FontFaceObserver from 'fontfaceobserver'
import 'assets/fonts/index.css'

const fontObserver = new FontFaceObserver('defaultFont', {})

fontObserver.load()
  .then(() => {
    const body = document.body
    body && body.classList.add('fontLoaded')
  })
  .catch((event: { message: string }) => console.log(event.message))

const element = document.getElementById('root')

if (element) {
  ReactDOM.render(<App />, element)
}
