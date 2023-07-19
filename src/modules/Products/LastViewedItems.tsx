import { useQuery } from '@apollo/client';
import { queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';

import Link from 'next/link';
import clsx from 'clsx';
import ProductsSkeleton from 'components/Products/Skeleton';

import Product from 'components/Products/Product';
import Slider from 'ui/Slider';
const LastViewedItems = ({
  category,
  slidesToShow = 5,
  slidesToScroll = 4,
  className,
  head,
  infinite = true,
  except
}: {
  category: string;
  slidesToShow?: number;
  slidesToScroll?: number;
  className?: string;
  head?: React.ReactNode;
  except?: string[];
  infinite?: boolean;
}) => {
  const changedSettings = {
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll - 1,
    dots: false,
    infinite,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow - 1,
          slidesToScroll: slidesToShow - 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          swipeToSlide: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const { currentUser } = useCurrentUser();
  const { data, loading } = useQuery(queries.getLastProductView, {
    variables: {
      limit: 10,
      customerId: currentUser?.erxesCustomerId
    },
    skip: !currentUser?.erxesCustomerId
  });

  if (loading) return <ProductsSkeleton wrapped />;
  const lastSeen = data?.lastViewedItems || [];

  if (!lastSeen.length) return null;
  return (
    <div className=" container my-3 my-md-4  ">
      <div className="text-blue mb-2 font-bold">
        <h5> Сүүлд үзсэн бүтээгдэхүүн</h5>
      </div>
      <Link href={{ pathname: 'Wholesale' }}>
        <Slider {...changedSettings} className={clsx('-slider', className)}>
          {lastSeen?.map((el: any) => (
            <div key={el._id}>
              <Product {...el?.product} />
            </div>
          )) || <div>No items</div>}
        </Slider>
      </Link>
    </div>
  );
};

export default LastViewedItems;
