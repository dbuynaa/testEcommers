import { getErxesApolloClient } from 'modules/ssClient';
import { queries } from 'modules/Products/graphql';

const getProductDetail: (id: string) => Promise<any> = async (id) => {
  const apolloClient = getErxesApolloClient();

  try {
    const { data } = await apolloClient.query({
      query: queries.productDetail,
      variables: { id },
      fetchPolicy: 'network-only',
    });

    const productDetail = (data || {}).poscProductDetail || {};

    return productDetail;
  } catch (error: any) {
    console.log('error', error.message);
  }
};

export default getProductDetail;
