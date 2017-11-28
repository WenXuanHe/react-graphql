const channels = [{
    id: '1',
    name: 'baseball',
    messages: [{
      id: '2',
      text: 'baseball is life',
    }]
  }];
let current_id = 3;

const resolvers = {

    Query: {
        channels: (_, {id}) => {
            
            if(!id) return channels;
            console.log(id);
            
            return channels.filter(item => item.id === +id);
        },

        channel: (root, { id }) => {
            return channels.find(channel => channel.id === id);
          },
    },

    Mutation: {
        addChannel: (_, {name}) =>{
            console.log(name);
            let newChannel = {id: current_id++, name};
            channels.push(newChannel);
            return newChannel;
        }
    }
};

export default resolvers;