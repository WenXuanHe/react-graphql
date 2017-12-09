import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import AddChannelWithMutation from '../components/AddChannel';

export const channelsListQuery = gql`
    query {
        channels {
            id
            name
        }
}
`;


// When wrapped with the graphql HOC, our ChannelsList component will receive a prop called data
const ChannelsList = ({ data: {loading, error, channels }}) => {
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return <div>
      <AddChannelWithMutation />
      <ul>
      { channels.map( ch => <li key={ch.id}><Link to={`channel/${ch.id}`}>{ch.name}</Link></li> ) }
    </ul>
    </div>;
  };

export default graphql(channelsListQuery)(ChannelsList);
