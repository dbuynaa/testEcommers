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

const queries = { currentUser };

export default queries;
