
import ProductsSlider from 'modules/Products/Slider';

const Latest = () => {
  return (
    <div className="container my-3 my-md-4">
      <h5 className="text-blue mb-2">
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
