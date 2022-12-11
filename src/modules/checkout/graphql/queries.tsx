import { gql } from '@apollo/client';

export const lastOrder = gql`
  query FullOrders(
    $customerId: String
    $statuses: [String]
    $perPage: Int
    $sortField: String
    $sortDirection: Int
  ) {
    fullOrders(
      customerId: $customerId
      statuses: $statuses
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      _id
      deliveryInfo
      registerNumber
      items {
        _id
        count
        discountAmount
        discountPercent
        isPackage
        isTake
        orderId
        productId
        productImgUrl
        productName
        unitPrice
      }
      qpayInvoice {
        _id
        amount
      }
    }
  }
`;

const queries = { lastOrder };

export default queries;
