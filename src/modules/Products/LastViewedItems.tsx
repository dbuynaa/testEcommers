import { useQuery } from '@apollo/client';
import { queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';

import clsx from 'clsx';
import ProductsSkeleton from 'components/Products/Skeleton';

import Product from 'components/Products/Product';
import Slider from 'ui/Slider';
const LastViewedItems = ({
  slidesToShow = 5,
  slidesToScroll = 4,
  className,
}: {
  slidesToShow?: number;
  slidesToScroll?: number;
  className?: string;
}) => {
  const changedSettings = {
    slidesToShow,
    slidesToScroll,
    dots: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow - 1,
          slidesToScroll: slidesToShow - 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          swipeToSlide: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { currentUser } = useCurrentUser();
  const { data, loading } = useQuery(queries.getLastProductView, {
    variables: {
      limit: 10,
      customerId: currentUser?.erxesCustomerId,
    },
    skip: !currentUser?.erxesCustomerId,
  });

  if (loading) return <ProductsSkeleton wrapped />;
  const lastSeen = data?.lastViewedItems || [];

  if (!lastSeen.length) return null;
  return (
    <div className=" container my-3 my-md-4  ">
      <div className="text-blue mb-2 font-bold">
        <h5> Сүүлд үзсэн бүтээгдэхүүн</h5>
      </div>
      <Slider {...changedSettings} className={clsx('-slider', className)}>
        {lastSeen?.map((el: any) => (
          <div key={el._id} className="pr-2">
            <Product {...el?.product} />
          </div>
        )) || <div>No items</div>}
      </Slider>
    </div>
  );
};

export default LastViewedItems;
