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

export const fullOrders = gql`
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
      createdAt
      paidDate
      status
      totalAmount
    }
  }
`;

const ordersCheckCompany = `
  query ordersCheckCompany($registerNumber: String!) {
    ordersCheckCompany(registerNumber: $registerNumber)
  }
`;

const queries = { lastOrder, ordersCheckCompany, fullOrders };

export default queries;
