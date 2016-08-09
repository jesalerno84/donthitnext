const graphql = require('graphql');
const graphqlRelay = require('graphql-relay');

const Track = require('../../models/track');

const nodeDefinitions = graphqlRelay.nodeDefinitions(globalId => {
	const idInfo = graphqlRelay.fromGlobalId(globalId);
	if (idInfo.type === 'trackInfo') {
		Track.find({_id: idInfo.id});
	}
	return null;
});



const imageType = new graphql.GraphQLObjectType({
	name: 'image',
	fields: {
		height: {type: graphql.GraphQLInt},
		url: {type: graphql.GraphQLString},
		width: {type: graphql.GraphQLInt},
	}
});

const albumType = new graphql.GraphQLObjectType({
	name: 'album',
	fields: {
		album_type: {type: graphql.GraphQLString},
		available_markets: {type: new graphql.GraphQLList(graphql.GraphQLString)},
		href: {type: graphql.GraphQLString},
		id: {type: graphql.GraphQLString},
		images: {type: new graphql.GraphQLList(imageType)},
		name: {type: graphql.GraphQLString},
		type: {type: graphql.GraphQLString},
		uri: {type: graphql.GraphQLString}
	}
});

const artistType = new graphql.GraphQLObjectType({
	name: 'artist',
	fields: {
		href: {type: graphql.GraphQLString},
		name: {type: graphql.GraphQLString},
		type: {type: graphql.GraphQLString},
		uri: {type: graphql.GraphQLString}
	}
});

const trackLinkType = new graphql.GraphQLObjectType({
	name: 'trackLink',
	fields: {
		href: {type: graphql.GraphQLString},
		name: {type: graphql.GraphQLString},
		type: {type: graphql.GraphQLString},
		uri: {type: graphql.GraphQLString}	
	}
});

const trackType = new graphql.GraphQLObjectType({
	name: 'track',
	fields: {
		album: {type: albumType},
		artists: {type: new graphql.GraphQLList(artistType)},
		available_markets: {type: new graphql.GraphQLList(graphql.GraphQLString)},
		disc_number: {type: graphql.GraphQLInt},
		duration_ms: {type: graphql.GraphQLInt},
		explicit: {type: graphql.GraphQLBoolean},
		href: {type: graphql.GraphQLString},
		id: {type: graphql.GraphQLString},
		is_playable: {type: graphql.GraphQLBoolean},
		linked_from: {type: trackLinkType},
		name: {type: graphql.GraphQLString},
		popularity: {type: graphql.GraphQLInt},
		preview_url: {type: graphql.GraphQLString},
		type: {type: graphql.GraphQLString},
		uri: {type: graphql.GraphQLString}
	}
});

const trackInfoType = new graphql.GraphQLObjectType({
	name: 'trackInfo',
	fields: {
		id: graphqlRelay.globalIdField('trackInfo', ti => ti._id),
		user_id: {type: graphql.GraphQLInt},
		added_at: {type: graphql.GraphQLString},
		track: {type: trackType}
	}
});


module.exports = {
	track: trackInfoType
};
