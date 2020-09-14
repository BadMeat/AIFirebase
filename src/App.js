import React, { Component } from 'react'
import Router from './Router'
import { StatusBar } from 'react-native'

export default class App extends Component {

  componentDidMount() {
    // Untuk mengganti status bar yg paling atas di androi
    StatusBar.setBackgroundColor("#0077d9")
  }

  render() {
    return (
      <Router />
    )
  }
}
