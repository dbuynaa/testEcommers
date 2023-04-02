import Banner from './banner';
import ProductsSlider from 'modules/Products/Slider';

const CategorySlider = ({ bannerCats }: any) => {
  return (
    <>
      {(bannerCats || []).map(
        ({ slug, title, featuredImage, image, custom }: any) => (
          <div className="cat-banner my-md-5 my-4 container" key={slug}>
            <div className="-header p-3 mb-3 rounded">
              <h5 className="text-blue">{title}</h5>
            </div>
            <div className="row">
              <Banner
                {...{
                  featuredImage,
                  hoverImage: (image || {}).hoverImage,
                  custom,
                }}
              />
              <div className="col-12 col-md-9">
                <ProductsSlider
                  category={(custom || {}).link}
                  slidesToShow={4}
                />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default CategorySlider;
