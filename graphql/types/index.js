const graphql = require('graphql');
const graphqlRelay = require('graphql-relay');
const connectionFromMongoCursor = require('relay-mongodb-connection');
const MongoClient = require('mongodb').MongoClient;

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

const collectionSortType = new graphql.GraphQLEnumType({
	name: 'collectionSort',
	values: {
		NAME: { value: 1 },
		ARTIST: { value: 2 },
		ALBUM: { value: 3 },
		ADDED_ON: { value: 4 }
	}
});

const sortDirectionType = new graphql.GraphQLEnumType({
	name: 'sortDirection',
	values: {
		ASC: { value: 1 },
		DESC: { value: -1 }
	}
});

const trackFilterType = new graphql.GraphQLInputObjectType({
	name: 'trackFilter',
	fields: {
		explicit: { type: graphql.GraphQLBoolean },
		artistName: { type: graphql.GraphQLString }
	}
});

const collectionType = new graphql.GraphQLObjectType({
	name: 'collection',
	fields: {
		artists: {
			type: new graphql.GraphQLList(artistType),
			args: {
				searchTerm: {
					type: graphql.GraphQLString
				}
			},
			resolve: function (_, args, user) {
				if (user) {
					const filters = {
						user_id: user.spotify_id
					};
					return new Promise((resolve, reject) => {
						if (args.searchTerm && args.searchTerm.length > 2) {
							const regex = new RegExp(`^${args.searchTerm}`);
							MongoClient.connect(process.env.MONGO_URL, (err, db) => {
								const collection = db.collection('tracks');

								collection.aggregate(
									{
										$project: {
											name: '$track.artists.name'
										}
									},
									{ $unwind: '$name' },
									{ $group: { _id: null, name: { $addToSet: '$name' } } },
									{ $unwind: '$name' },
									{ $sort: { name: 1 } },
									{ $match: { name: { $regex: regex } } },
									{ $group: { _id: null, name: { $push: '$name' } } }
								).toArray((err, result) => {
									err ? reject(err) : resolve(result);
								});

								db.close();
							});


						} else {
							resolve([]);
						}
					});
				}
			}
		},
		tracks: {
			type: graphqlRelay.connectionDefinitions({ name: 'Track', nodeType: trackInfoType }).connectionType,
			args: {
				...graphqlRelay.connectionArgs,
				sortBy: { type: collectionSortType },
				sortDirection: { type: sortDirectionType },
				explicit: { type: graphql.GraphQLBoolean },
				artistName: { type: graphql.GraphQLString }
	},
resolve: function (_, args, user) {
	if (user) {
		const sortDirection = args.sortDirection ? args.sortDirection : 1;
		const sort = {};
		switch (args.sortBy) {
			case 2:
				sort['track.artists.name'] = sortDirection;
				break;
			case 3:
				sort['track.album.name'] = sortDirection;
				break;
			case 4:
				sort['added_at'] = sortDirection;
				break;
			default:
				sort['track.name'] = sortDirection;
				break;
		}

		const filters = {
			user_id: user.spotify_id
		};
		if (args.explicit !== undefined) {
			filters['track.explicit'] = args.explicit;
		}

		if (args.artistName !== undefined) {
			filters['track.artists.name'] = args.artistName;
		}

		return connectionFromMongoCursor(Track.collection.find(filters, {}).sort(sort), args);
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
