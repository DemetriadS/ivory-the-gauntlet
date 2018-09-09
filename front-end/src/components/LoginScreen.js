import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import firebase from 'firebase'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    const { history } = this.props
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(
          {
            email: '',
            password: '',
            error: ''
          },
          () => {
            const userId = firebase.auth().currentUser.uid
            firebase
              .database()
              .ref('users/' + userId)
              .set({
                todos: ['eeee macarena']
              })
              .then(() => {
                history.push('/home')
              })
              .catch(err => {
                console.log(err)
              })
          }
        )
      })
      .catch(err => {
        this.setState({
          password: '',
          error: err.toString()
        })
      })
  }

  render() {
    const { email, password, error } = this.state
    return (
      <div style={styles.components}>
        <form onSubmit={this.handleSubmit} style={styles.formstyle}>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
            style={styles.imputstyle}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
            style={styles.imputstyle}
          />
          <button type="submit" style={styles.buttonstyle}>
            Log in
          </button>
          <p>{error}</p>
        </form>
        <NavLink to="/signup" style={styles.navlinkstyle}>
          Go to Sign up
        </NavLink>
      </div>
    )
  }
}

var styles = {
  components: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100',
    height: '100'
  },
  formstyle: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center'
  },
  imputstyle: {
    width: 100,
    height: 15
  },
  buttonstyle: {
    backgroundColor: 'blue',
    color: 'white',
    width: 50,
    height: 20,
    borderRadius: 5
  },
  navlinkstyle: {
    textDecoration: 'none'
  }
}

export default withRouter(Login)
