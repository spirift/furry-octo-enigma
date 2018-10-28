const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    info: () => `News about pen and paper role playing games`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
    // link: (root, {id}) => {
    //   return links.find((link) => link.id === id)
    // },
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info)
    },
    // updateLink: (root, args) => {
    //   const linkIndex = links.findIndex((link) => link.id === args.id)
    //   if (linkIndex > -1) {
    //     if (args.description) {
    //       links[linkIndex].description = args.description
    //     }
    //     if (args.url) {
    //       links[linkIndex].url = args.url
    //     }
    //     return links[linkIndex]
    //   }
    // },
    // deleteLink: (root, { id }) => {
    //   const linkIndex = links.findIndex((link) => link.id === id)
    //   if (linkIndex > -1) {
    //     const oldLink = links[linkIndex]
    //     links.splice(linkIndex, 1)
    //     return oldLink
    //   }
    // },
  },
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
