import { LOGIN } from './queries/page';
import { getApolloClient } from './client';
import { getGqlQuery } from './utils';
import type { DocumentNode } from 'graphql';

export const getPage = async (query: DocumentNode) => {
  const apolloClient = getApolloClient();
  const data = await apolloClient.query({
    ...getGqlQuery(query),
  });

  const page = data?.data.pageBy;

  return { page };
};

export async function getLogin() {
  return await getPage(LOGIN);
}
