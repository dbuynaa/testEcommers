'use client';
import Slider from 'ui/Slider';
import useGetProducts from 'lib/useGetProducts';
import Loading from 'ui/Loading';
import Product from 'components/Products/Product';
import ArrowRight from 'icons/ArrowRight';
import Link from 'next/link';
import Button from 'ui/Button';
import { useEffect } from 'react';
import clsx from 'clsx';

const ProductsSlider = ({
  category,
  slidesToShow,
  className,
}: {
  category: string;
  slidesToShow: number;
  className?: string;
}) => {
  const changedSettings = {
    slidesToShow,
    slidesToScroll: slidesToShow - 1,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow - 1,
          slidesToScroll: slidesToShow - 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          swipeToSlide: true,
          slidesToShow: 1.05,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { products, loading, getProducts } = useGetProducts({
    category,
    perPage: 16,
  });

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <Slider {...changedSettings} className={clsx('-slider', className)}>
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
  );
};

export default ProductsSlider;
