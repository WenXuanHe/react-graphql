import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChannelsList from './components/ChannelsList';
import ChannelDetails from './components/ChannelDetails';
import { ApolloProvider } from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:5000/graphql' }),
  cache: new InMemoryCache()
});

/**
 * apollo配合react-router
 */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to Apollo</h2>
            </div>
            {/* <ChannelDetails/> */}
            <Switch>
              <Route path="/" exact  component={ChannelsList} />
              <Route path="/channel/:channelId" component={ChannelDetails} />
            </Switch>
          </div>
        </ApolloProvider>
       </BrowserRouter>
    );
  }
}



export default App;