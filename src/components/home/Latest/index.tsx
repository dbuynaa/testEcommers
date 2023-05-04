
import ProductsSlider from 'modules/Products/Slider';

const Latest = () => {
  return (
    <div className="container my-md-5 my-4">
      <h5 className="text-blue text-center mb-md-4 mb-0">
        Шинээр ирсэн бүтээгдэхүүн
      </h5>
      <ProductsSlider
        category=""
        slidesToShow={5}
        className="slick-arrow-standart"
      />
    </div>
  );
};

export default Latest;
