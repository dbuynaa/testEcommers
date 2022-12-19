import FeaturedProduct from './FeaturedProduct';
import { use } from 'react';
import { getGridBanners } from 'lib/wp/posts';

const FeaturedProducts = () => {
  const { posts } = use(getGridBanners());

  const sortedPosts = (posts || []).sort(function (a, b) {
    if (a.info.sort < b.info.sort) {
      return -1;
    }
    if (a.info.sort > b.info.sort) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="row ft-product-row">
      <div className="col-6 p-1">
        <FeaturedProduct className="big" {...sortedPosts[0]} />
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-6 p-1">
            <FeaturedProduct className="small" {...sortedPosts[1]} />
          </div>
          <div className="col-6 p-1">
            <FeaturedProduct className="small" {...sortedPosts[2]} />
          </div>
          <div className="col-12 p-1">
            <FeaturedProduct className="long" {...sortedPosts[3]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
