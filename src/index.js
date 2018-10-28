const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, {id}) => {
      return links.find((link) => link.id === id)
    }
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      const linkIndex = links.findIndex((link) => link.id === args.id)
      if (linkIndex > -1) {
        if (args.description) {
          links[linkIndex].description = args.description
        }
        if (args.url) {
          links[linkIndex].url = args.url
        }
        return links[linkIndex]
      }
    }
  },
}


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
