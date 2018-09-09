import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import firebase from 'firebase'
import config from './config/config'
import Login from './components/LoginScreen'
import Signup from './components/SignupScreen'
import Home from './components/HomeScreen'

class App extends Component {
  componentWillMount = () => {
    firebase.initializeApp(config.firebaseConfig)
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path="/" />
          <Route component={Signup} path="/signup" />
          <Route component={Home} path="/home" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
