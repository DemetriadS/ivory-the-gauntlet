import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import firebase from 'firebase'
import image from '../pictures/The-one-ring.jpg'
import styled from 'styled-components'

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
      <Wrapper>
      <Title>Sign up for a new adventure</Title>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          <Button type="submit" >Sign up</Button>
          <Error>{error}</Error>
        </Form>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'white', marginBottom: 10 }}>Go to Log in</NavLink>
      </Wrapper>
    )
  }
}

const Button = styled.button`
background-color: darkred
color: #FFFFFF
text-align: center
alignContent: center
width: 125px
height: 25px
border-radius: 5px
margin-top: 10px
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
const Wrapper = styled.div`
position: absolute
display: flex
flex-direction: column
justify-content: center
align-items: center
text-align: center
background-image: url(${image});
background-repeat: no-repeat
background-size: 100% 100%
overflow: hidden
top: 0
bottom: 0
left: 0
right: 0
`
const Title = styled.p`
color: white
font-size: 25px
font-style: italic
margin-bottom: 300px
`
const Form = styled.form`
display: flex
flex-direction: column
`
const Input = styled.input`
text-align: center
font-size: 13px
width: 250px
height: 25px
border-radius: 6px
margin-top: 10px
`
const Error = styled.p`
color: white
font-size: 13px
`

export default withRouter(Signup)
