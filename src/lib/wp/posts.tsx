import { GRID_BANNERS, FT_CATEGORIES, BANNER_CATS } from './queries/posts';
import { getApolloClient } from './client';
import { getGqlQuery } from './utils';
import type { DocumentNode } from 'graphql';

export async function getGridBanners() {
  return await getPosts(GRID_BANNERS);
}

export async function getFtCats() {
  return await getPosts(FT_CATEGORIES);
}
export async function getBannerCats() {
  return await getPosts(BANNER_CATS);
}

export const getPosts = async (query: DocumentNode) => {
  const apolloClient = getApolloClient();
  const data = await apolloClient.query({
    ...getGqlQuery(query),
  });
  const posts = data?.data.posts.nodes;
  return {
    posts: Array.isArray(posts) && posts.map(mapPostData),
  };
};

export function mapPostData(post: any = { featuredImage: { node: null } }) {
  const data = { ...post };

  data.featuredImage = data.featuredImage.node;

  return data;
}
