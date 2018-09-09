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
            history.push('/home')
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
          <button type="submit">Log in</button>
          <p>{error}</p>
        </form>
        <NavLink to="/signup">Go to Sign up</NavLink>
      </div>
    )
  }
}

export default withRouter(Login)
