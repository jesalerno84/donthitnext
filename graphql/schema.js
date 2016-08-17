const graphql = require('graphql');
const graphqlRelay = require('graphql-relay');
const connectionFromMongoCursor = require('relay-mongodb-connection');

const {collectionType, getCollection, nodeField} = require('./types');
const Track = require('../models/track');

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      node: nodeField,
      collection: {
        type: collectionType,
        resolve: () => getCollection()
      }
    })
  })
});

module.exports = schema;
