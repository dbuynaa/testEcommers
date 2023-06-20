import { useQuery } from '@apollo/client';
import { queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';

const LastViewedItems = () => {
  const { currentUser } = useCurrentUser();
  const { data, loading } = useQuery(queries.getLastProductView, {
    variables: {
      limit: 10,
      customerId: currentUser?.erxesCustomerId,
    },
    skip: !currentUser?.erxesCustomerId,
  });
  if (loading) return <div>Loading...</div>;
  return (
    <div className="order-[100]">
      {data?.lastViewedItems?.map((item) => (
        <div key={item.id}>{item?.product?.name}</div>
      )) || <div>No items</div>}
    </div>
  );
};

export default LastViewedItems;
