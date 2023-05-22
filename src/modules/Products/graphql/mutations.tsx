import { gql } from '@apollo/client';

const wishlistAdd = gql`
  mutation WishlistAdd($productId: String, $customerId: String) {
    wishlistAdd(productId: $productId, customerId: $customerId) {
      _id
      productId
      customerId
    }
  }
`;

const wishlistRemove = gql`
  mutation WishlistRemove($id: String!) {
    wishlistRemove(_id: $id) {
      _id
    }
  }
`;

const mutations = { wishlistAdd, wishlistRemove };

export default mutations;
