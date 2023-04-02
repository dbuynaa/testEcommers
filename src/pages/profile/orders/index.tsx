import { useCurrentUser } from 'modules/appContext';
import { queries } from 'modules/checkout/graphql';
import OrderItem from 'components/profile/orderItem';
import { useQuery } from '@apollo/client';
import LoadingDots from 'ui/LoadingDots';
import Empty from 'ui/Empty';
import Layout from 'components/profile/layout';

const Orders = () => {
  const ORDER_STATUSES = ['new', 'doing', 'done', 'complete', 'reDoing'];

  const { currentUser } = useCurrentUser();

  const { data, loading } = useQuery(queries.fullOrders, {
    variables: {
      statuses: ORDER_STATUSES,
      customerId: (currentUser || {}).erxesCustomerId,
      perPage: 24,
      sortField: 'createdAt',
      sortDirection: -1,
    },
  });
  const { fullOrders } = data || {};

  const renderContent = () => {
    if (loading)
      return (
        <div className="py-5 my-5 flex items-center justify-center">
          <LoadingDots />
        </div>
      );
    if ((fullOrders || []).length === 0)
      return (
        <div className=" flex items-center justify-center">
          <Empty />
        </div>
      );
    return (fullOrders || []).map((orders: any) => (
      <OrderItem {...orders} key={orders._id} />
    ));
  };

  return (
    <div>
      <h5 className="text-blue pb-4">Миний захиалгууд</h5>
      {renderContent()}
    </div>
  );
};

Orders.getLayout = (page) => <Layout>{page}</Layout>;

export default Orders;
