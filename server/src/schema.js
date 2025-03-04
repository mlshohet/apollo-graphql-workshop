
// converts graphQL schemas to strings
const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
        "The query to get the tracks array"
        tracksForHome: [Track!]!
        track(id: ID!): Track
    }

    type Mutation {
        incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
    }

    type IncrementTrackViewsResponse {
        code: Int!
        success: Boolean!
        message: String!
        track: Track
    }

"A track is a group of Modules that teaches about a specific topic"
    type Track {
        id: ID!
        title: String!
        author: Author!
        thumbnail: String
        length: Int
        modulesCount: Int
        description: String
        numberOfViews: Int
        modules: [Module!]!
    }

    type Module {
        id: ID!
        title: String!
        length: Int
    }

    type Author {
        id: ID!
        name: String!
        photo: String
    }
`;

module.exports = typeDefs;
