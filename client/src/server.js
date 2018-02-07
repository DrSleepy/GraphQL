import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

const serverURI = 'http://localhost:8000/graphiql';
const httpLink = new HttpLink({ uri: serverURI });

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export default new VueApollo({
  defaultClient: apolloClient
});
