import { gql } from '@apollo/client';
const commonFields = `
  _id
  name
  code

`;

const productCategories = gql`
  query poscProductCategories($excludeEmpty: Boolean) {
    poscProductCategories(excludeEmpty: $excludeEmpty) {
      ${commonFields}
      order
      parentId
      isRoot
    }
  }
`;

const products = gql`
query poscProducts($categoryId: String, $page: Int, $perPage: Int, $searchValue: String, $sortDirection: Int, $sortField: String){ 
  poscProducts(categoryId: $categoryId, page: $page, perPage: $perPage, searchValue: $searchValue, sortDirection: $sortDirection, sortField: $sortField) {
      ${commonFields}
      unitPrice
      productCount
      attachment {
        url
      }
  }
}
`;
const productsCount = gql`
  query productsCount(
    $categoryId: String
    $type: String
    $searchValue: String
  ) {
    poscProductsTotalCount(
      categoryId: $categoryId
      type: $type
      searchValue: $searchValue
    )
  }
`;

const productDetail = gql`
  query PoscProductDetail($id: String) {
    poscProductDetail(_id: $id) {
      _id
      attachment {
        url
      }
      category {
        _id
        order
        name
        isRoot
      }
      code
      createdAt
      customFieldsData
      description
      name
      remainder
      sku
      tagIds
      type
      unitPrice
      vendorId
    }
  }
`;

const queries = { productCategories, products, productsCount, productDetail };

export default queries;
