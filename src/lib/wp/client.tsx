import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { removeLastTrailingSlash } from './utils';

let client: ApolloClient<NormalizedCacheObject>;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: removeLastTrailingSlash(process.env.NEXT_PUBLIC_WORDPRESS_API_URL),
    }),
    cache: new InMemoryCache(),
  });
}
