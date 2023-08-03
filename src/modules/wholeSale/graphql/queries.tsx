import { gql } from '@apollo/client';

const commonFields = `
  _id
  name
  code

`;
export const getPricingPlans = gql`
  query PricingPlans($status: String, $productId: String, $findOne: Boolean) {
    pricingPlans(status: $status, productId: $productId, findOne: $findOne) {
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
      products
      productsBundle
      categories
      isEndDateEnabled
      startDate
      endDate
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
