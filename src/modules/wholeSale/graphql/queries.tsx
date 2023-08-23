import { gql } from '@apollo/client';

const commonFields = `
  _id
  name
  code

`;
export const getPricingPlans = gql`
  query PricingPlans($status: String, $productId: String, $findOne: Boolean, $date: Date, $isQuantityEnabled: Boolean) {
    pricingPlans(status: $status, productId: $productId, findOne: $findOne, date: $date, isQuantityEnabled: $isQuantityEnabled) {
      status
      name
      _id
      createdAt
      createdBy
      updatedAt
      updatedBy
      createdUser {
        details {
          fullName
        }
      }
      updatedUser {
        details {
          fullName
        }
      }
      quantityRules {
        discountValue
        discountType
        value
      }
      value
      products
      productIds
      productsBundle
      categories
      isEndDateEnabled
      startDate
      endDate
    }
  }
`;

export const getSalePricingPlans = gql`
  query PricingPlans($status: String, $productId: String, $findOne: Boolean, $date: Date, $isQuantityEnabled: Boolean) {
    pricingPlans(status: $status, productId: $productId, findOne: $findOne, date: $date, isQuantityEnabled: $isQuantityEnabled) {
      value
    }
  }
`;

export const getProducts = gql`
query poscProducts($categoryId: String, $page: Int, $perPage: Int, $searchValue: String, $sortDirection: Int, $sortField: String,$ids: [String]){ 
  poscProducts(categoryId: $categoryId, page: $page, perPage: $perPage, searchValue: $searchValue, sortDirection: $sortDirection, sortField: $sortField,ids: $ids) {
      ${commonFields}
      unitPrice
      createdAt
      attachment {
        url
      }
  }
}
`;
export const getPricingPlanCount = gql`
  query Query(
    $status: String
    $prioritizeRule: String
    $totalAmount: String
    $productId: String
    $quantity: Float
    $date: Date
    $findOne: Boolean
    $page: Int
    $perPage: Int
    $sortField: String
    $sortDirection: Int
  ) {
    pricingPlansCount(
      status: $status
      prioritizeRule: $prioritizeRule
      totalAmount: $totalAmount
      productId: $productId
      quantity: $quantity
      date: $date
      findOne: $findOne
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
    )
  }
`;

export const getPricingPlanDetail = gql`
  query PricingPlanDetail($pricingPlanDetailId: String) {
    pricingPlanDetail(id: $pricingPlanDetailId) {
      _id
      name
      status
      products
      startDate
      endDate
      branchIds
      categories
      quantityRules {
        type
        discountValue
        value
      }
      priceRules {
        discountValue
        value
        type
      }
    }
  }
`;
