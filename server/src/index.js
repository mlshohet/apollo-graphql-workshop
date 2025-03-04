const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        const { cache } = server;
      
        return {
          dataSources: {
            trackAPI: new TrackAPI({ cache }),
          }
        }
      }
    })

    console.log(`
        Apollo server is running!
        Query at ${url}
    `);
}

startApolloServer();