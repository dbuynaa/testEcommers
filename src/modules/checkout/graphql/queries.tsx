import { gql } from '@apollo/client';

export const orderItemFields = `
    _id
    unitPrice
    orderId
    productName
    count
    productId
    isPackage
    isTake
    status
    productImgUrl
    discountAmount
    discountPercent
    bonusCount
`;

export const lastOrder = gql`
  query LastOrder(
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
      paidDate
      registerNumber
      totalAmount
      mobileAmount
      paidAmounts {
        _id
        type
        amount
        info
      }
      items {
        ${orderItemFields}
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
      modifiedAt
      paidDate
      status
      totalAmount
      number
    }
  }
`;

const ordersCheckCompany = `
  query ordersCheckCompany($registerNumber: String!) {
    ordersCheckCompany(registerNumber: $registerNumber)
  }
`;

export const orderFields = `
  _id
  createdAt
  modifiedAt
  number
  status
  paidDate
  mobileAmount
  totalAmount
  slotCode
  registerNumber
  customerId
  printedEbarimt
  billType
  billId
  origin
  type
  deliveryInfo
`;

const customerFields = `
  _id
  primaryPhone
  firstName
  primaryEmail
  lastName
`;

const putResponseFields = `
  billId
  lottery
  qrData 
  billType
  amount
`;

const orderDetail = gql`
query OrderDetail($id: String, $customerId: String) {
  orderDetail(_id: $id, customerId: $customerId) {
      ${orderFields}

      items {
        ${orderItemFields}
      }

      customer {
        firstName
        lastName
        primaryEmail
        primaryPhone
        code
      }

      user {
        ${customerFields}
      }

      putResponses {
        ${putResponseFields}
      }
    }
  }
`;

const invoices = `
  query Invoices($contentType: String, $contentTypeId: String) {
    invoices(contentType: $contentType, contentTypeId: $contentTypeId) {
      _id
      amount
      status
    }
  }
`;

const orderItemDetail = gql`
  query OrderItemDetail($id: String) {
    poscProductDetail(_id: $id) {
      remainder
      category {
        name
      }
    }
  }
`;

const addresses = gql`
  query Addresses {
    clientPortalCurrentUser {
      customer {
        addresses
      }
    }
  }
`;

const queries = {
  orderItemDetail,
  lastOrder,
  ordersCheckCompany,
  fullOrders,
  orderDetail,
  invoices,
  addresses,
};

export default queries;
