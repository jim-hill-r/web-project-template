import { ApolloServer, gql } from 'apollo-server'
import { SchemaBuilder } from './schema/schema-builder'
import { ResolverBuilder } from './resolvers/resolver-builder'

// Services Injection
import { MockEventService } from './services/mock/mock-event-service'

const typeDefs = new SchemaBuilder().Build()
const resolvers = new ResolverBuilder(new MockEventService()).Build()
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
});