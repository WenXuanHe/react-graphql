import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
  
const channelsListQuery = gql`
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
    return <ul>
      { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
    </ul>;
  };

export default graphql(channelsListQuery)(ChannelsList);
