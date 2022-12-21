import { gql } from '@apollo/client';
import { featuredImage } from './posts';

export const LOGIN = gql`
  query LOGIN {
    pageBy(uri: "login") {
      ${featuredImage()}
    }
  }
`;

export const FOOTER = gql`
  query FOOTER {
    pageBy(uri: "footer") {
      ${featuredImage()}
      content
      contact {
        mail
        map
        phone
      }
    }
  }
`;
