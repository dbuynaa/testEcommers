import Banner from './banner';
import ProductsSlider from 'modules/Products/Slider';
import clsx from 'clsx';

const CategorySlider = ({ bannerCats }: any) => {
  const check = (image, featuredImage: any) =>
    !!(image || {}).hoverImage || !!featuredImage;
  return (
    <>
      {(bannerCats || []).map(
        ({ slug, title, featuredImage, image, custom }: any) => (
          <div
            className="cat-banner my-3 my-md-4 container"
            key={slug}
            style={{ order: custom?.order }}
          >
            <h5 className="text-blue mb-2 mb-0">{title}</h5>
            <div className="row">
              {check(image, featuredImage) && (
                <Banner
                  {...{
                    featuredImage,
                    hoverImage: (image || {}).hoverImage,
                    custom
                  }}
                />
              )}
              <div
                className={clsx(
                  'col-12',
                  check(image, featuredImage) && 'col-md-9 col-xl-9-5'
                )}
              >
                <ProductsSlider
                  category={(custom || {}).link}
                  slidesToShow={check(image, featuredImage) ? 4 : 5}
                  slidesToScroll={check(image, featuredImage) ? 4 : 1}
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
