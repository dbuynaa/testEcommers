import type { DocumentNode } from 'graphql';

export function removeLastTrailingSlash(url?: string) {
  if (typeof url !== 'string') return url;
  return url.replace(/\/$/, '');
}

export const getGqlQuery: (query: DocumentNode) => {
  query: DocumentNode;
  fetchPolicy: 'network-only';
} = (query) => ({
  query,
  fetchPolicy: 'network-only',
});
