import React, { Component } from 'react'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

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

  handleLogOut() {
    firebase.auth().signOut()
    .then(() => this.props.history.push('/'))
    .catch(function(err) {
    })
  }

  render() {
    const { userInput } = this.state
    return (
      <Wrapper>
        <Header>
          <Button onClick = {this.handleLogOut.bind(this)}>Log Out</Button>
        </Header>
        <Title>Add to your adventure list! </Title>
          <Form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              name="userInput"
              placeholder="Type your todo here.."
              value={userInput}
              onChange={this.handleChange}
            />
            <Button type="submit">Add</Button>
          </Form>
          <div style={{color: '#FFFFFF'}}>{this.renderTodos()}</div>
      </Wrapper>
    )
  }
}
const Input = styled.input`
text-align: center
font-size: 13px
width: 250px
height: 25px
border-radius: 6px
margin-top: 10px
`
const Form = styled.form`
display: flex
flex-direction: column
`
const Wrapper = styled.div`
position: absolute;
display: flex
flex-direction: column
justify-content: center;
background-image: url('http://w4.wallls.com/uploads/original/201711/27/wallls.com_174936.jpg');
background-repeat: no-repeat;
background-size: 100% 100%;
align-items: center
text-align: center
overflow: hidden
top: 0
bottom: 0
left: 0
right: 0
`
const Header = styled.div`
width: 100%
// height: 50px
`
const Title = styled.h1`
color: #FFFFFF
font-size: 25px
font-style: italic
`
const Button = styled.button`
background-color: darkred
color: #FFFFFF
text-align: center
alignContent: center
width: 125px
height: 25px
border-radius: 5px
margin-top: 10px;
margin-left: auto
margin-right: auto
border: 0.1em solid #FFFFFF
box-sizing: border-box
text-decoration: none
transition: all 0.2s
&:hover {
  color: #000000
  background-color: #FFFFFF
}
`

export default withRouter(Home)
