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
      erxesCustomerId
      companyRegistrationNumber
    }
  }
`;

const currentConfig = gql`
  query CurrentConfig {
    currentConfig {
      deliveryConfig
    }
  }
`;

const queries = { currentUser, currentConfig };

export default queries;
