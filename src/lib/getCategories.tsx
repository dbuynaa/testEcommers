import { getErxesApolloClient } from 'modules/ssClient';
import { queries } from 'modules/Products/graphql';

const getCategories: () => Promise<any> = async () => {
  const apolloClient = getErxesApolloClient();
  const { data } = await apolloClient.query({
    query: queries.productCategories,
    variables: {
      perPage: 100,
    },
  });
  const categories = (data || {}).poscProductCategories || [];

  const rootCatergories = categories.filter(
    ({ parentId }: { parentId: string }) => !parentId
  );
  return { categories, rootCatergories };
};

export default getCategories;
