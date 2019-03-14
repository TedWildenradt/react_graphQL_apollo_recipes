import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './index.css';
import App from './components/App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql"
});

const Root = () => (
  <Router>
    <Switch>
      <Route to="/" exact component={App} />
      <Route to="/signin" component={Signin} />
      <Route to="/signup" component={Signup} />
      <Redirect to="/" />
    </Switch>
  </Router>
)


ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById('root')
);
