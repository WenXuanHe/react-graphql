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
    type Query {
        channels(id: Int): [Channel]    
    }
    type Mutation{
        addChannel(name: String!): Channel
    }
`;

export default typeDefs;
