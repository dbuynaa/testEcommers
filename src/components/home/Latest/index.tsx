import ProductsSlider from 'modules/Products/Slider';

const Latest = () => {
  return (
    <div className="container my-3 my-md-4 " style={{ order: 10 }}>
      <h5 className="text-blue mb-2 font-bold">Шинээр ирсэн бүтээгдэхүүн</h5>
      <div className="latest-slider">
        <ProductsSlider
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

export default Latest;
