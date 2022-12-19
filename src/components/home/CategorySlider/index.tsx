import { use } from 'react';
import Banner from './banner';
import Products from './products';
import { getBannerCats } from 'lib/wp/posts';

const CategorySlider = () => {
  const { posts } = use(getBannerCats());
  return (
    <>
      {(posts || []).map(({ slug, title, featuredImage, image }) => (
        <div className="cat-banner py-5" key={slug}>
          <div className="-header p-3 mb-3 rounded">
            <h5 className="text-blue">{title}</h5>
          </div>
          <div className="row">
            <Banner
              {...{ featuredImage, hoverImage: (image || {}).hoverImage }}
            />
            <Products category={(image || {}).pathname} />
          </div>
        </div>
      ))}
    </>
  );
};

export default CategorySlider;
