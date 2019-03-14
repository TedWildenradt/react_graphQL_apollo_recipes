import React from 'react';
import {Mutation} from 'react-apollo';
import {SIGNUP_USER} from '../../queries/index';
import Error from '../error';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

class Signup extends React.Component {
  state = { ...initialState}

  clearState = () => {
    this.setState({ ...initialState })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = ( event, signupUser) => {
    event.preventDefault();
    signupUser().then(data => {
      console.log(data)
      this.clearState();
    })
  }

  validateForm = () => {
    const {username, email, password, passwordConfirmation} = this.state;
    const isInvalid = !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  }

  render(){
    const {username, email, password, passwordConfirmation} = this.state;
    return(
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation mutation={ SIGNUP_USER } variables={{ username, email, password }}>
          {(signupUser, { data, loading, error }) => {
            return(
              
              <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                <input type="text" name="username" placeholder="Username" autoComplete="username" onChange={this.handleChange} value={username}/>
                <input type="text" name="email" placeholder="Email" autoComplete="email" onChange={this.handleChange} value={email}/>
                <input type="password" name="password" placeholder="Password" autoComplete="password" onChange={this.handleChange} value={password}/>
                <input type="password" name="passwordConfirmation" placeholder="Confirm Password" autoComplete="password" onChange={this.handleChange} value={passwordConfirmation}/>
                <button type="submit" disabled={loading || this.validateForm() } className="button-primary">Submit</button>
                {error && <Error error={error} /> }        
              </form>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default Signup;