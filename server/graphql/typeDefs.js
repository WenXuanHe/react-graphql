const typeDefs = `
    type Channel {
        id: Int!                
        name: String
        messages:[Message]
    }
    type Message {
        id: ID!
        text: String
    }

    input MessageInput{
        channelId: ID!
        text: String
    }

    type Query {
        channels(id: Int): [Channel]  
        channel(id: Int):   Channel
    }
    type Mutation{
        addChannel(name: String!): Channel
        addMessage(message: MessageInput!):Message
    }
`;

export default typeDefs;
