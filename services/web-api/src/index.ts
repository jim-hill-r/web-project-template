import { ApolloServer, gql } from 'apollo-server'
import { SchemaBuilder } from './schema/schema-builder'
import { ResolverBuilder } from './resolvers/resolver-builder'

// Services Injection
import { MockUserService } from './services/mock/mock-user-service'

const typeDefs = new SchemaBuilder().Build()
const resolvers = new ResolverBuilder(new MockUserService()).Build()
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
});