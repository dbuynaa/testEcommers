import { gql } from '@apollo/client';

const addEditParamDefs = `$items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String, $slotCode: String, $registerNumber: String, $billType: String, $origin: String, $deliveryInfo: JSON`;
const addEditParams = `items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId, slotCode: $slotCode, registerNumber: $registerNumber, billType: $billType, origin: $origin, deliveryInfo: $deliveryInfo`;

const ordersAdd = gql`
  mutation ordersAdd(${addEditParamDefs}) {
    ordersAdd(${addEditParams}) {
     _id
    }
  }
`;

const ordersEdit = gql`
  mutation ordersEdit($_id: String!, ${addEditParamDefs}) {
    ordersEdit(_id: $_id, ${addEditParams}) {
      _id,
      status
    }
  }
`;

const ordersAddPayment = gql`
  mutation ordersAddPayment(
    $_id: String!
    $cashAmount: Float
    $cardAmount: Float
    $cardInfo: JSON
    $receivableAmount: Float
    $mobileAmount: Float
  ) {
    ordersAddPayment(
      _id: $_id
      cashAmount: $cashAmount
      cardAmount: $cardAmount
      cardInfo: $cardInfo
      receivableAmount: $receivableAmount
      mobileAmount: $mobileAmount
    ) {
      _id
    }
  }
`;

const ordersSettlePayment = gql`
  mutation ordersSettlePayment(
    $_id: String!
    $billType: String!
    $registerNumber: String
  ) {
    ordersSettlePayment(
      _id: $_id
      billType: $billType
      registerNumber: $registerNumber
    ) {
      success
      lotteryWarningMsg
      errorCode
      message
      getInformation
    }
  }
`;

const orderChangeStatus = gql`
  mutation orderChangeStatus($_id: String!, $status: String) {
    orderChangeStatus(_id: $_id, status: $status) {
      _id
    }
  }
`;

const orderItemChangeStatus = gql`
  mutation orderItemChangeStatus($_id: String!, $status: String) {
    orderItemChangeStatus(_id: $_id, status: $status) {
      _id
      status
    }
  }
`;

const generateInvoiceUrl = `
  mutation GenerateInvoiceUrl(
    $amount: Float!
    $companyId: String
    $contentType: String
    $contentTypeId: String
    $customerId: String
    $description: String
    $email: String
    $paymentIds: [String]
    $phone: String
  ) {
    generateInvoiceUrl(
      amount: $amount
      companyId: $companyId
      contentType: $contentType
      contentTypeId: $contentTypeId
      customerId: $customerId
      description: $description
      email: $email
      paymentIds: $paymentIds
      phone: $phone
    )
  }
`;

const mutations = {
  ordersAdd,
  ordersEdit,
  ordersAddPayment,
  ordersSettlePayment,
  orderChangeStatus,
  orderItemChangeStatus,
  generateInvoiceUrl,
};

export default mutations;
