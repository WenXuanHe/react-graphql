import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter} from 'react-router';

export const channelDetailsQuery = gql`
    query ChannelDetailsQuery($channelId : ID!) {
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
        let {loading, error, channel} = this.props;
        if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>{error.message}</p>;
          }
          if(channel == null){
            return <div>not found</div>    
          }
          alert(JSON.stringify(channel))
          return (<div>
              <div className="channelName">
                {channel.name}
              </div>
            </div>);
    }
}

export default graphql(channelDetailsQuery, {
    options: (props) => ({
      variables: { channelId: props.match.params.channelId },
    }),
  })(withRouter(ChannelDetails))