import { gql } from '@apollo/client';
export const GRID_BANNERS = gql`
  query GRID_BANNER {
    posts(where: { categoryName: "grid-banner" }, last: 4) {
      nodes {
        info {
          sort
          pathname
        }
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
      }
    }
  }
`;

export const FT_CATEGORIES = gql`
  query FT_CATEGORIES {
    posts(where: { categoryName: "ft-cats" }, last: 12) {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: MEDIUM)
          }
        }
        more {
          pathname
        }
        title
      }
    }
  }
`;

export const BANNER_CATS = gql`
  query BANNER_CATS {
    posts(where: { categoryName: "banner-cat" }, last: 12) {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: LARGE)
          }
        }
        title
        image {
          hoverImage {
            sourceUrl(size: LARGE)
          }
          order
          pathname
        }
        slug
      }
    }
  }
`;
