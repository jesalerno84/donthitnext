const graphql = require('graphql');
const graphqlRelay = require('graphql-relay');
const connectionFromMongoCursor = require('relay-mongodb-connection');

const trackType = require('./types').track;
const Track = require('../models/track');

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      tracks: {
        type: graphqlRelay.connectionDefinitions({name: 'Track', nodeType: trackType}).connectionType,
        args: graphqlRelay.connectionArgs,
        resolve: function (_, args, user) {
        	if (user) {
            console.log(args);
          	return connectionFromMongoCursor(Track.collection.find({}).sort({'added_at': 1}), args);
          } else {
	          return  graphqlRelay.connectionFromArray([], args);
          }
        }
      }
    }
  })
});

module.exports = schema;
