import ProductsSlider from 'modules/Products/Slider';

const Latest = () => {
  return (
    <div className="container my-3 my-md-4 " style={{ order: 10 }}>
      <h5 className="text-blue mb-2">Шинээр ирсэн бүтээгдэхүүн</h5>
      <div className="latest-slider">
        <ProductsSlider
          category=""
          slidesToShow={5}
          slidesToScroll={3 - 1}
          className="slick-arrow-standart "
        />
      </div>
    </div>
  );
};

export default Latest;
