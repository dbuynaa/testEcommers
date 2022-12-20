'use client';
import Slider from 'react-slick';
import useGetProducts from 'lib/useGetProducts';
import Loading from 'ui/Loading';
import Product from 'components/Products/Product';
import ArrowRight from 'icons/ArrowRight';
import Link from 'next/link';
import { slickSettings } from 'utils/constants';
import Button from 'ui/Button';

const changedSettings = {
  ...slickSettings,
  slidesToShow: 3,
  slidesToScroll: 2,
};

const Products = ({ category }: { category: string }) => {
  const { products, loading } = useGetProducts({
    category,
    perPage: 16,
  });

  if (loading)
    return (
      <div className="col-9">
        <Loading />
      </div>
    );

  return (
    <div className="col-9">
      <Slider {...changedSettings} className="-slider">
        {(products || []).map((el: any, index: number) => (
          <div className="px-2 flex flex-col -item" key={index}>
            <Product {...el} />
          </div>
        ))}
        <Button
          className="-more text-black me-2"
          Component={Link}
          href={'/products?category=' + category}
        >
          <h5>Бүгдийг үзэх</h5>
          <ArrowRight className="ms-2" />
        </Button>
      </Slider>
    </div>
  );
};

export default Products;
