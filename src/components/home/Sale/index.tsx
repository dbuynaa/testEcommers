import PricingProductsSlider from 'modules/Products/SaleProduct';
import React from 'react';

const Sale = () => {
  return (
    <div>
      <h5 className="text-blue mb-2 font-bold container">
        {' '}
        Хямдралтай бүтээгдэхүүн
      </h5>
      <div className="latest-slider">
        <PricingProductsSlider
          category=""
          slidesToShow={5}
          slidesToScroll={2}
          className="slick-arrow-standart "
          infinite={false}
        />
      </div>
    </div>
  );
};

export default Sale;
