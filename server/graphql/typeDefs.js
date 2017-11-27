const typeDefs = `
    type Channel {
        id: Int!                
        name: String
    }
    type Query {
        channels(id: Int): [Channel]    
    }
    type Mutation{
        addChannel(name: String!): Channel
    }
`;

export default typeDefs;
