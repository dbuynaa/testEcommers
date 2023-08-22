import { gql } from '@apollo/client';

const currentUser = gql`
  query clientPortalCurrentUser {
    clientPortalCurrentUser {
      _id
      email
      firstName
      lastName
      type
      erxesCompanyId
      phone
      avatar
      customer {
        addresses
      }
      erxesCustomerId
      companyRegistrationNumber
    }
  }
`;

const currentConfig = gql`
  query CurrentConfig {
    currentConfig {
      erxesAppToken
      paymentIds
    }
  }
`;

const getConfigId = gql`
  query clientPortalGetConfigByDomain {
    clientPortalGetConfigByDomain {
      _id
    }
  }
`;

const queries = { currentUser, currentConfig, getConfigId };

export default queries;
