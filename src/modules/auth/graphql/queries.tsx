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

const queries = { currentUser, currentConfig };

export default queries;
