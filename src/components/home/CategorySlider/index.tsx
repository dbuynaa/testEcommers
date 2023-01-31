import { use, useRef } from 'react';
import Banner from './banner';
import Products from './products';
import { getBannerCats } from 'lib/wp/posts';

const CategorySlider = () => {
  const { posts } = use(getBannerCats());
  return (
    <>
      {(posts || []).map(({ slug, title, featuredImage, image, custom }) => (
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
            <Products category={(custom || {}).link} />
          </div>
        </div>
      ))}
    </>
  );
};

export default CategorySlider;
