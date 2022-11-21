import FeaturedProduct from './FeaturedProduct';

const FeaturedProducts = () => {
  return (
    <div className="row ft-product-row">
      <div className="col-6 p-1">
        <FeaturedProduct
          className="big"
          bgImg="/images/banner-1.png"
          title="Xiami Mi Pad 5"
        />
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-6 p-1">
            <FeaturedProduct
              className="small"
              bgImg="/images/banner-2.png"
              title="Redmi 9"
            />
          </div>
          <div className="col-6 p-1">
            <FeaturedProduct
              className="small"
              bgImg="/images/banner-3.png"
              title="Gaming Special Headset"
            />
          </div>
          <div className="col-12 p-1">
            <FeaturedProduct className="long"  bgImg="/images/banner-4.png"
              title="Gaming Special Headset"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
