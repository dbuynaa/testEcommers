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
      paidDate
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

export const orderFields = `
  _id
  createdAt
  modifiedAt
  number
  status
  paidDate
  cardAmount
  mobileAmount
  cashAmount
  totalAmount
  receivableAmount
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
        middleName
        primaryEmail
        primaryPhone
        code
      }

      user {
        ${customerFields}
      }

      cardPayments {
        _id
        amount
        cardInfo
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

const queries = {
  lastOrder,
  ordersCheckCompany,
  fullOrders,
  orderDetail,
  invoices,
};

export default queries;
