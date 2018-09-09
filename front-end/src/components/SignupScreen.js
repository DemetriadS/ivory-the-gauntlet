import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import firebase from 'firebase'
import image from '../pictures/The-one-ring.jpg'

class Signup extends Component {
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
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(
          {
            email: '',
            password: '',
            error: ''
          },
          () => {
            history.push('/')
          }
        )
      })
      .catch(err => {
        this.setState({
          password: '',
          error: err
        })
      })
  }

  render() {
    const { email, password, error } = this.state
    return (
      <div style={styles.component}>
      <p style={styles.titlestyle}>Sign up for a new adventure</p>
        <form onSubmit={this.handleSubmit} style={styles.formstyle}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            style={styles.imputstyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            style={styles.imputstyle}
          />
          <button type="submit" style={styles.buttonstyle}>Sign up</button>
          <p style={styles.errorstyle}>{error}</p>
        </form>
        <NavLink to="/" style={styles.navlinkstyle}>Go to Log in</NavLink>
      </div>
    )
  }
}

var styles = {
  component: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundImage: 'url(' + image + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    top:'0',
    bottom:'0',
    left:'0',
    right:'0',
  },
  titlestyle: {
    color: 'white',
    fontSize: 25,
    fontStyle: 'italic',
    marginBottom: 300,
  },
  formstyle: {
    display: 'flex',
    flexDirection: 'column',
  },
  imputstyle: {
    textAlign: 'center',
    fontSize: 13,
    width: 250,
    height: 25,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonstyle: {
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    alignContent: 'center',
    width: 125,
    height: 25,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  navlinkstyle: {
    textDecoration: 'none',
    color: 'white',
    marginBottom: 10,
  },
  errorstyle: {
    color: 'white',
    fontSize: 13,
  }
}

export default withRouter(Signup)
