'use client';
import Slider from 'ui/Slider';
import useGetProducts from 'lib/useGetProducts';
import { useEffect } from 'react';
import Product from 'components/Products/Product';
import Button from 'ui/Button';
import Link from 'next/link';
import ArrowRight from 'icons/ArrowRight';

const Latest = () => {
  const { products, loading, getProducts } = useGetProducts({
    sortField: 'createdAt',
    perPage: 16,
    sortDirection: -1,
  });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="col-12 col-md-9">
      <Slider {...changedSettings} className="-slider">
        {(products || []).map((el: any, index: number) => (
          <div className="px-2 flex flex-col -item" key={index}>
            <Product {...el} />
          </div>
        ))}
        <Button
          className="-more text-black me-2"
          Component={Link}
          href={'/products'}
        >
          <h5>Бүгдийг үзэх</h5>
          <ArrowRight className="ms-2" />
        </Button>
      </Slider>
    </div>
  );
};

const changedSettings = {
  slidesToShow: 4,
  slidesToScroll: 3,
  dots: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1,
      },
    },
  ],
};

export default Latest;
