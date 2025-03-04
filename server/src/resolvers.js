const resolvers = {
    Query: {
        // returns an array of Tracks that will be used
        // to populate the homepage grid in the client
        tracksForHome: (_, __, contextValue) => {
            return contextValue.dataSources.trackAPI.getTracksForHome();
        },

        track: (_, { id }, { dataSources }) => {
            return dataSources.trackAPI.getTrack(id);
        }
    },

    Mutation: {
        incrementTrackViews: async (_, { id }, { dataSources }) => {
            try {
                const track = await dataSources.trackAPI.incrementTrackViews(id);
        
                return {
                    code: 200,
                    success: true,
                    message: `Successfully incremented for ${id}`,
                    track,
                };
            } catch (err) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    track: null,
                };
            }
        }
    },

    Track: {
        author: ({ authorId }, _, { dataSources }) => {
            return dataSources.trackAPI.getAuthor(authorId);
        },
        modules: ({ id }, _, {dataSources}) => {
            return dataSources.trackAPI.getTrackModules(id)
        }
    }

};

module.exports = resolvers;