import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    collection: () => Relay.QL`
      query {
        collection
      }
    `,
  };
  static routeName = 'MainRoute';
}
