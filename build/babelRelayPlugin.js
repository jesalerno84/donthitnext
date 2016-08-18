const getBabelRelayPlugin = require('babel-relay-plugin');
const schema = require('../graphql/schema.json');

const babelRelayPlugin = getBabelRelayPlugin(schema.data);

module.exports = babelRelayPlugin;
