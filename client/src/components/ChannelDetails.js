import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router';
import AddMessage from './AddMessage';

export const channelDetailsQuery = gql`
    query ChannelDetailsQuery($channelId : Int!) {
      channel(id: $channelId) {
          id
          name
          messages {
          id
          text
          }
      }
    }
`;


class ChannelDetails extends React.Component{

    render(){
        let {loading, error, channel} = this.props.data;
        if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>{error.message}</p>;
          }
          if(channel == null){
            return <div>not found</div>    
          }
          return (
          <div>
            <div className="channelName">
              <h3>{channel.name}</h3>
              <ul>
              {
                channel.messages && channel.messages.map((message, i) => {
                  return <li key={i}>{message.text}</li>
                })
              }
              </ul>
            </div>
            <AddMessage />
          </div>);
    }
}

export default graphql(channelDetailsQuery, {
    options: (props) => ({
      variables: { channelId: +props.match.params.channelId },
    }),
  })(ChannelDetails)