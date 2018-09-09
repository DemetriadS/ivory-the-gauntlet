import React, { Component } from 'react'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'

let databaseRef = {}

class Home extends Component {
  constructor() {
    super()
    this.state = {
      userInput: '',
      todos: []
    }
  }

  componentWillMount() {
    if (!firebase.auth().currentUser) this.props.history.push('/')
    else {
      var userId = firebase.auth().currentUser.uid
      databaseRef = firebase.database().ref(`users/${userId}/todos`)
    }
  }

  componentDidMount() {
    databaseRef.on('value', (data) => {
      this.setState({
        todos: data.val()
      })
    })

    databaseRef.on('child_changed', (data) => {
      this.setState({
        todos: data.val()
      })
    })
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

  renderTodos = () => {
    // return this.state.todos.map((todo, i) => <p key={i}>{todo}</p>)
    return <p>{this.state.todos[0]}</p>
  }

  render() {
    const { userInput } = this.state
    return (
      <div>
        <h1>To do list:</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="userInput"
            placeholder="Type your todo here.."
            value={userInput}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>
        </form>
        <div>{this.renderTodos()}</div>
      </div>
    )
  }
}

export default withRouter(Home)
