import Banner from './banner';
import ProductsSlider from 'modules/Products/Slider';

const CategorySlider = ({ bannerCats }: any) => {
  return (
    <>
      {(bannerCats || []).map(
        ({ slug, title, featuredImage, image, custom }: any) => (
          <div className="cat-banner my-3 my-md-4 container" key={slug}>
            <h5 className="text-blue mb-2 mb-0">
              {title}
            </h5>
            <div className="row">
              <Banner
                {...{
                  featuredImage,
                  hoverImage: (image || {}).hoverImage,
                  custom,
                }}
              />
              <div className="col-12 col-md-9 col-xl-9-5">
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
