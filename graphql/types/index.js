const graphql = require('graphql');
const graphqlRelay = require('graphql-relay');
const connectionFromMongoCursor = require('relay-mongodb-connection');

const Track = require('../../models/track');

class Collection { }

const collection = new Collection();

const getCollection = () => collection;

const {nodeInterface, nodeField} = graphqlRelay.nodeDefinitions(
	globalId => {
		const {type, id} = graphqlRelay.fromGlobalId(globalId);
		if (type === 'trackInfo') {
			return Track.find({ _id: id });
		} else if (type === 'collection') {
			return getCollection(id);
		}
		return null;
	},
	obj => {
		return trackInfoType;
	}
);



const imageType = new graphql.GraphQLObjectType({
	name: 'image',
	fields: {
		height: { type: graphql.GraphQLInt },
		url: { type: graphql.GraphQLString },
		width: { type: graphql.GraphQLInt },
	}
});

const albumType = new graphql.GraphQLObjectType({
	name: 'album',
	fields: {
		album_type: { type: graphql.GraphQLString },
		available_markets: { type: new graphql.GraphQLList(graphql.GraphQLString) },
		href: { type: graphql.GraphQLString },
		id: { type: graphql.GraphQLString },
		images: { type: new graphql.GraphQLList(imageType) },
		name: { type: graphql.GraphQLString },
		type: { type: graphql.GraphQLString },
		uri: { type: graphql.GraphQLString }
	}
});

const artistType = new graphql.GraphQLObjectType({
	name: 'artist',
	fields: {
		href: { type: graphql.GraphQLString },
		name: { type: graphql.GraphQLString },
		type: { type: graphql.GraphQLString },
		uri: { type: graphql.GraphQLString }
	}
});

const trackLinkType = new graphql.GraphQLObjectType({
	name: 'trackLink',
	fields: {
		href: { type: graphql.GraphQLString },
		name: { type: graphql.GraphQLString },
		type: { type: graphql.GraphQLString },
		uri: { type: graphql.GraphQLString }
	}
});

const trackType = new graphql.GraphQLObjectType({
	name: 'track',
	fields: {
		album: { type: albumType },
		artists: { type: new graphql.GraphQLList(artistType) },
		available_markets: { type: new graphql.GraphQLList(graphql.GraphQLString) },
		disc_number: { type: graphql.GraphQLInt },
		duration_ms: { type: graphql.GraphQLInt },
		explicit: { type: graphql.GraphQLBoolean },
		href: { type: graphql.GraphQLString },
		id: { type: graphql.GraphQLString },
		is_playable: { type: graphql.GraphQLBoolean },
		linked_from: { type: trackLinkType },
		name: { type: graphql.GraphQLString },
		popularity: { type: graphql.GraphQLInt },
		preview_url: { type: graphql.GraphQLString },
		type: { type: graphql.GraphQLString },
		uri: { type: graphql.GraphQLString }
	}
});

const trackInfoType = new graphql.GraphQLObjectType({
	name: 'trackInfo',
	fields: {
		id: graphqlRelay.globalIdField('trackInfo', ti => ti._id),
		user_id: { type: graphql.GraphQLInt },
		added_at: { type: graphql.GraphQLString },
		track: { type: trackType }
	},
	interfaces: [nodeInterface]
});

const collectionType = new graphql.GraphQLObjectType({
	name: 'collection',
	fields: {
		tracks: {
			type: graphqlRelay.connectionDefinitions({ name: 'Track', nodeType: trackInfoType }).connectionType,
			args: graphqlRelay.connectionArgs,
			resolve: function (_, args, user) {
				if (user) {
					console.log(args);
					return connectionFromMongoCursor(Track.collection.find({}).sort({ 'added_at': 1 }), args);
				} else {
					console.log('not logged in');
					return graphqlRelay.connectionFromArray([], args);
				}
			}
		}
	}
});

module.exports = {
	collectionType: collectionType,
	getCollection: getCollection,
	nodeField: nodeField
};
