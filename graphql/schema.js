const graphql = require('graphql');
const trackType = require('./types').track;
const Track = require('../models/track');

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      tracks: {
        type: new graphql.GraphQLList(trackType),
        resolve: function (_, args, user) {
        	if (user) {
          	return Track.find({});
          } else {
	          return [];
          }
        }
      }
    }
  })
});

module.exports = schema;
