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
    }
  });

  if (loading) return <div>Loading...</div>;
  const lastSeen = data?.lastViewedItems || [];
  return (
    <div className=" container my-3 my-md-4  ">
      <div className="text-blue mb-2 font-bold">
        <h5> Сүүлд үзсэн бүтээгдэхүүн</h5>
      </div>
      <Link href={{ pathname: 'Wholesale' }}>
        <div className="order-[100] flex gap-10 item-center ">
          {lastSeen?.map((item) => (
            <div
              key={item.id}
              className="product text-center  "
            >
              <Image
                src={
                  item?.product?.attachment?.url
                    ? imgSrc + item.product.attachment.url
                    : ''
                }
                alt={item?.product?.name}
                className="img-wrap"
                height={50}
                width={50}
              />
              <div className="flex ">
                <h3 className="product-name mb-1 mt-3">
                  {item?.product?.name}
                </h3>
                <p className="product-price">{item?.product?.price}</p>
              </div>
            </div>
          )) || <div>No items</div>}
        </div>
      </Link>
    </div>
  );
};

export default LastViewedItems;
