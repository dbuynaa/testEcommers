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
        ${featuredImage('LARGE')}
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
