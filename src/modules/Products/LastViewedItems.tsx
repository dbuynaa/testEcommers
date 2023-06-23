import { useQuery } from '@apollo/client';
import { queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';
import Image from 'ui/Image';
import Link from 'next/link';
import { imgSrc } from 'utils';

const LastViewedItems = () => {
  const { currentUser } = useCurrentUser();
  const { data, loading } = useQuery(queries.getLastProductView, {
    variables: {
      limit: 10,
      customerId: currentUser?.erxesCustomerId
    },
    skip: !currentUser?.erxesCustomerId
  });
  if (loading) return <div>Loading...</div>;
  return (
    <Link className="product text-center" href={{ pathname: 'Wholesale' }}>
      <div className="order-[100]">
        {data?.lastViewedItems?.map((item) => (
          <div key={item.id} className="product text-center">
            <Image
              src={
                item?.product?.attachment.url
                  ? imgSrc + item.product.attachment.url
                  : ''
              }
              alt={item?.product?.name}
              className="img-wrap"
            />
            <div className="">
              <h3 className="product-name mb-1 mt-3">{item?.product?.name}</h3>
              <p className="product-price">{item?.product?.price}</p>
            </div>
          </div>
        )) || <div>No items</div>}
      </div>
    </Link>
  );
};

export default LastViewedItems;
