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
  head,
  except,
}: {
  category: string;
  slidesToShow: number;
  className?: string;
  head?: React.ReactNode;
  except?: string[];
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
          slidesToShow: 2,
          slidesToScroll: 2,
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

  const filteredProducts = (products || []).filter(
    (el: any) => !except?.includes(el._id)
  );

  if (filteredProducts.length === 0) return <></>;

  return (
    <>
      {!!head && head}
      <Slider {...changedSettings} className={clsx('-slider', className)}>
        {(filteredProducts || []).map((el: any, index: number) => (
          <div
            className={clsx(
              'flex flex-col -item',
              index === 0 ? 'pe-1' : 'px-1'
            )}
            key={index}
          >
            <Product {...el} />
          </div>
        ))}
        {products.length > 15 && (
          <>
            <Button
              className="-more text-black me-2"
              Component={Link}
              href={'/products?category=' + category}
            >
              <h5>Бүгдийг үзэх</h5>
              <ArrowRight className="ms-2" />
            </Button>
            <div  className='-item'/>
          </>
        )}
      </Slider>
    </>
  );
};

export default ProductsSlider;
