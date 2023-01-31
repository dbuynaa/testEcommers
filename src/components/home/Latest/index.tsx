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
    perPage: 16,
    category: '',
  });

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container my-md-5 my-4">
      <h4 className="text-blue text-center mb-md-4 mb-0">
        Шинээр ирсэн бүтээгдэхүүн
      </h4>
      <Slider {...changedSettings} className="-slider slick-arrow-standart">
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
