import { getErxesApolloClient } from 'modules/ssClient';
import { queries } from 'modules/Products/graphql';

const getProducts: (categoryId: string) => Promise<any> = async (
  categoryId
) => {
  const apolloClient = getErxesApolloClient();
  try {
    const { data } = await apolloClient.query({
      query: queries.products,
      variables: { categoryId, perPage: 16 },
    });
    const products = (data || {}).poscProducts || [];
    return products;
  } catch (error: any) {
    console.log('error', error.message);
  }
};

export default getProducts;
