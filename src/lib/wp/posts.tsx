import {
  GRID_BANNERS,
  FT_CATEGORIES,
  BANNER_CATS,
  IMG_BANNER,
  NEWS,
  SLIDER_BANNER,
  NEWS_DETAIL,
  BRANCHES,
  VIDEOS,
  BRANDS,
  VIDEOS_BY_TAG,
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

export async function getVideos() {
  return await getPosts(VIDEOS);
}

export async function getVideosByTag(id) {
  return await getPosts(VIDEOS_BY_TAG, { tag: id });
}

export const getNews = async () => await getPosts(NEWS);

export const getBranches = async () => await getPosts(BRANCHES);

export const getBrands = async () => await getPosts(BRANDS);

export async function getPostById(id: string) {
  const apolloClient = getApolloClient();

  if (id !== '[id]') {
    const data = await apolloClient.query({
      ...getGqlQuery(NEWS_DETAIL),
      variables: { id },
    });

    const post = data?.data.postBy;

    return {
      post,
    };
  }
  return {
    post: {},
  };
}

export const getPosts = async (
  query: DocumentNode,
  variables?: any
): Promise<{ posts?: WpPost[] }> => {
  const apolloClient = getApolloClient();
  const data = await apolloClient.query({
    ...getGqlQuery(query),
    variables,
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
  if (data?.featuredImage) {
    data.featuredImage = data?.featuredImage?.node;
  }
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
  date?: string;
  id?: string;
  content?: string;
  productInfo?: {
    accessories?: string;
    description?: string;
    youtubeUrl?: string;
  };
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
  branchInfo?: {
    address: string;
    more: string;
    phone: string;
  };
};
