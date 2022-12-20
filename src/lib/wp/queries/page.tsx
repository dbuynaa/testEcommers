import { gql } from '@apollo/client';

export const LOGIN = gql`
  query LOGIN {
    pageBy(uri: "login") {
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;
