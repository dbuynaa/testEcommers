import { queries } from 'modules/Products/graphql';
import { getErxesApolloClient } from 'modules/ssClient';

const getProductIds: any = async () => {
  const apolloClient = getErxesApolloClient();
  try {
    const { data } = await apolloClient.query({
      query: queries.productIds,
    });
    const products = (data || {}).poscProducts || [];
    return products;
  } catch (error: any) {
    console.log('error', error.message);
  }
};

export default getProductIds;
