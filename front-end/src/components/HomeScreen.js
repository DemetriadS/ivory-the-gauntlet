import React, { Component } from 'react'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      userInput: '',
      todos: []
    }
  }

  componentWillMount() {
    if (!firebase.auth().currentUser) this.props.history.push('/')
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    // trimite userInfo la server
    this.setState({
      userInput: ''
    })
  }

  render() {
    const {userInput} = this.state
    return (
      <div>
        <h1>Todos hermanos:</h1>
        <form onSubmit={this.handleSubmit}>
        <input type="text" name="userInput" placeholder="Type your todo here.." value={userInput} onChange={this.handleChange}/>
        <button type='submit'>Add</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Home)
