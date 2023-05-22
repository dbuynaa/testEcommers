import { gql } from '@apollo/client';

const custom = `
  custom {
    link
    order
  }
`;

export const featuredImage = (size?: 'LARGE' | 'MEDIUM') => `
  featuredImage {
    node {
      ${size ? `sourceUrl(size: ${size})` : 'sourceUrl'}
    }
  }
`;

export const GRID_BANNERS = gql`
  query GRID_BANNER {
    posts(where: { categoryName: "grid-banner" }, last: 4) {
      nodes {
        ${custom}
        ${featuredImage('LARGE')}     
      }
    }
  }
`;

export const FT_CATEGORIES = gql`
  query FT_CATEGORIES {
    posts(where: { categoryName: "ft-cats" }, last: 12) {
      nodes {
        ${featuredImage('MEDIUM')}
        ${custom}
        title
      }
    }
  }
`;

export const BANNER_CATS = gql`
  query BANNER_CATS {
    posts(where: { categoryName: "banner-cat" }, last: 12) {
      nodes {
        ${featuredImage('LARGE')}
        title
        ${custom}
        image {
          hoverImage {
            sourceUrl(size: LARGE)
          }
        }
        slug
      }
    }
  }
`;

export const IMG_BANNER = gql`
  query IMG_BANNER {
    posts(where: { categoryName: "img_banner" }, last: 12) {
      nodes {
        ${featuredImage()}
        ${custom}
        title
        imgbanner {
          ratio
        }
      }
    }
  }
`;

export const SLIDER_BANNER = gql`
  query SLIDER_BANNER {
    posts(where: { categoryName: "slider" }, last: 12) {
      nodes {
        ${featuredImage()}
        ${custom}
        mobile {
          img {
            sourceUrl
          }
        }
        title
      }
    }
  }
`;

export const NEWS = gql`
  query NewQuery {
    posts(
      where: { categoryName: "news", orderby: { field: DATE, order: DESC } }
      last: 10
    ) {
      nodes {
        id
        date
        ${featuredImage()}
        title
      }
    }
  }
`;

export const NEWS_DETAIL = gql`
  query PostBySlug($id: ID!) {
    postBy(id: $id) {
      id
      content
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      excerpt
      title
      slug
    }
  }
`;

export const BRANCHES = gql`
  query Branches {
    posts(where: { categoryName: "branches" }) {
      nodes {
        ${featuredImage()}
        branchInfo {
          address
          more
          phone
        }
        content
        title
      }
    }
  }
`;

const videoFields = `
nodes {
  ${featuredImage()}
  date
  title
  video {
    videoId
  }
}
`;

export const VIDEOS = gql`
  query Videos {
    posts(where: { categoryName: "video" }) {
      ${videoFields}
    }
  }
`;

export const VIDEOS_BY_TAG = gql`
  query ProductInfo($tag: String) {
    posts(where: { tag: $tag }) {
      ${videoFields}
    }
  }
`;

export const BRANDS = gql`
 query Videos {
    posts(where: { categoryName: "brands" }) {
      nodes {
        title
        ${featuredImage()}
      }
    }
  }
`;
