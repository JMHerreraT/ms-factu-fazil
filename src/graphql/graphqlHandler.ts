import { ApolloServer, gql } from 'apollo-server-lambda';
import ErrorConstants from '@jherrerat/lib-commons-nodejs/constants';
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello world!"
    }
};
ErrorConstants.ERROR;
const server = new ApolloServer({ typeDefs, resolvers });
exports.handler = server.createHandler();