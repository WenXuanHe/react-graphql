import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {channelDetailsQuery} from './ChannelDetails'; 

const AddMessage = ({ mutate, match }) => {
    const handleKeyUp = (evt) => {
      if (evt.keyCode === 13) {
        /**
         * 向graphQL发起请求，variables里面的属性就是传递过去的参数
         * 参数的类型要和服务端typeDefs中保持一致
         */
        mutate({
          variables: {
            message: {
              channelId: +match.params.channelId,
              text: evt.target.value
            }
          },
          /**
           * 先伪造一个新增的数据，让页面立马完成渲染，再去服务端请求
           * 名字与mutation中定义的保持一致
           */
          optimisticResponse: {
            addMessage: {
              text: evt.target.value,
              id: Math.round(Math.random() * -1000000),
              __typename: 'Message',
            },
          },
          /**
           * 更新渲染页面
           */
          update: (store, { data: { addMessage } }) => {
            // Read the data from the cache for this query.
            const data = store.readQuery({
              query: channelDetailsQuery,
              variables: {
                channelId: +match.params.channelId,
              }
            });
            // Add our Message from the mutation to the end.
            data.channel.messages.push(addMessage);
            // Write the data back to the cache.
            store.writeQuery({
              query: channelDetailsQuery,
              variables: {
                channelId: +match.params.channelId,
              },
              data
            });
          },
        });
        evt.target.value = '';
      }
    };
    return ( 
        <input
        type="text"
        placeholder="New message"
        onKeyUp={handleKeyUp}
      />
    );
  };

  const addMessageMutation = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;

const AddMessageWithMutation = graphql(
    addMessageMutation,
  )(withRouter(AddMessage));
  export default AddMessageWithMutation;