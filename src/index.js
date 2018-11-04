const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const Feed = require('./resolvers/Feed')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
  Feed,
}


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/michael-7f6e38/pnp-herald/dev',
      secret: 'drn389sef9t9s-29930snsn-SLQKB-01Hhrl-29N-8Gt',
      debug: true,
    }),
  }),
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
