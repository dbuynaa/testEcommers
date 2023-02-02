'use client';
import ProductsSlider from 'modules/Products/Slider';

const Latest = () => {
  return (
    <div className="container my-md-5 my-4">
      <h4 className="text-blue text-center mb-md-4 mb-0">
        Шинээр ирсэн бүтээгдэхүүн
      </h4>
      <ProductsSlider
        category=""
        slidesToShow={5}
        className="slick-arrow-standart"
      />
    </div>
  );
};

export default Latest;
