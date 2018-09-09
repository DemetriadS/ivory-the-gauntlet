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
    databaseRef.on('value', data => {
      if (data.val()) {
        this.setState({
          todos: this.mapArrayToObject(data.val())
        })
      } else {
        this.setState({
          todos: []
        })
      }
    })
  }

  mapArrayToObject = data => {
    let newData = []
    for (let key in data) {
      newData.push({
        key,
        text: data[key].text
      })
    }
    return newData
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    const userId = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref(`users/${userId}`)
      .child('todos')
      .push({
        text: this.state.userInput
      })
      .then(() => {
        this.setState({
          userInput: ''
        })
      })
  }

  handleDelete = (key) => {
      var userId = firebase.auth().currentUser.uid
      firebase.database().ref(`users/${userId}/todos/${key}`).remove() 
  }

  renderTodos = () => {
    return this.state.todos.map(todo => (
      <div key={todo.key}>
        <p>{todo.text}</p>
        <button style={{color:'red'}} onClick={this.handleDelete.bind(this,todo.key)}>X</button>
      </div>
    ))
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
