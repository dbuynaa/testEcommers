import {
  GRID_BANNERS,
  FT_CATEGORIES,
  BANNER_CATS,
  IMG_BANNER,
  SLIDER_BANNER,
} from './queries/posts';
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

export async function getImgBanner() {
  return await getPosts(IMG_BANNER);
}

export async function getSliderBanner() {
  return await getPosts(SLIDER_BANNER);
}

export const getPosts = async (
  query: DocumentNode
): Promise<{ posts?: WpPost[] }> => {
  const apolloClient = getApolloClient();
  const data = await apolloClient.query({
    ...getGqlQuery(query),
  });
  const posts = data?.data.posts.nodes;
  return {
    posts: (posts || []).map(mapPostData),
  };
};

export function mapPostData(
  post: WpPost & { featuredImage: { node?: any } }
): WpPost {
  const data = { ...post };

  data.featuredImage = data?.featuredImage?.node;

  return data;
}

export const sortPosts = (posts: WpPost[] = []) =>
  (posts || []).sort(function (a, b) {
    if (a.custom.order < b.custom.order) {
      return -1;
    }
    if (a.custom.order > b.custom.order) {
      return 1;
    }
    return 0;
  });

export type WpPost = {
  featuredImage?: { sourceUrl: string };
  custom: { order: number; link: string };
  title?: string;
  slug?: string;
  image?: {
    hoverImage?: {
      sourceUrl: string;
    };
  };
  imgbanner?: {
    ratio: number;
  };
  mobile?: {
    img: {
      sourceUrl: string;
    };
  };
};
