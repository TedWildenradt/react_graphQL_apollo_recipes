import React from 'react';
import {Mutation} from 'react-apollo';
import {SIGNIN_USER} from '../../queries/index';
import Error from '../error';
import { withRouter } from 'react-router-dom';

const initialState = {
  username: '',
  password: ''
}

class Signin extends React.Component {
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

  handleSubmit = ( event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({data}) => {
      console.log(data)
      window.localStorage.setItem('token', data.signinUser.token)
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    })
  }

  validateForm = () => {
    const {username, password} = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  }

  render(){
    const {username, password} = this.state;
    return(
      <div className="App">
        <h2 className="App">Signin</h2>
        <Mutation mutation={ SIGNIN_USER } variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return(
              
              <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                <input type="text" name="username" placeholder="Username" autoComplete="username" onChange={this.handleChange} value={username}/>
                <input type="password" name="password" placeholder="Password" autoComplete="password" onChange={this.handleChange} value={password}/>
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

export default withRouter(Signin);