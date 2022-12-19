'use client';
import Slider, { Settings } from 'react-slick';
import useGetProducts from 'lib/useGetProducts';
import Loading from 'ui/Loading';
import Product from 'components/Products/Product';
import ChevronLeft from 'icons/ChevronLeft';
import Button from 'ui/Button';
import ArrowRight from 'icons/ArrowRight';
import Link from 'next/link';

const settings: Settings = {
  slidesToShow: 3,
  speed: 500,
  infinite: false,
  arrows: true,
  slidesToScroll: 2,
  lazyLoad: 'ondemand',
  prevArrow: (
    <Button className="slick-prev">
      <ChevronLeft />
    </Button>
  ),
  nextArrow: (
    <Button className="slick-next">
      <ChevronLeft />
    </Button>
  ),
};

const Products = ({ category }: { category: string }) => {
  const { products, loading } = useGetProducts({
    category: 'YBRrcfqeDPcx4M2Tg',
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
      <Slider {...settings} className="-slider">
        {(products || []).map((el: any, index: number) => (
          <div className="px-2 flex flex-col -item" key={index}>
            <Product {...el} />
          </div>
        ))}
        <Button
          className="-more text-black me-2"
          Component={Link}
          href={category}
        >
          <h5>Бүгдийг үзэх</h5>
          <ArrowRight className="ms-2" />
        </Button>
      </Slider>
    </div>
  );
};

export default Products;
