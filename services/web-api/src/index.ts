import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import'

const typeDefs = importSchema('./schema.graphql')

const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];

  const resolvers = {
    Query: {
      books: () => books,
    },
  };

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});