// @flow
import React, { Component } from 'react'
import Header from 'components/Header'
import GlobalStyle from 'global/global-styles'
import Home from 'pages/Home'

class App<P: *> extends Component <P, {}> {

  render() {

    return (
      <React.Fragment>
        <GlobalStyle />
        <Header />
        <Home />
      </React.Fragment>
    )
  }
}

export default App
