import FeaturedProduct from './FeaturedProduct';
import { use } from 'react';
import { getGridBanners, sortPosts } from 'lib/wp/posts';

const FeaturedProducts = () => {
  const { posts } = use(getGridBanners());

  const sortedPosts = sortPosts(posts);

  return (
    <div className="my-md-5 my-4">
      <div className="row ft-product-row px-3">
        <div className="col-md-6 col-12 p-1">
          <FeaturedProduct
            className="big"
            {...sortedPosts[0]}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="col-md-6 col-12">
          <div className="row">
            <div className="col-6 p-1">
              <FeaturedProduct
                className="small"
                {...sortedPosts[1]}
                sizes="(max-width: 768px) 50vw, (max-width: 1360px) 25vw, 340px"
              />
            </div>
            <div className="col-6 p-1">
              <FeaturedProduct
                className="small"
                {...sortedPosts[2]}
                sizes="(max-width: 768px) 50vw, (max-width: 1360px) 25vw, 340px"
              />
            </div>
            <div className="col-12 p-1">
              <FeaturedProduct
                className="long"
                {...sortedPosts[3]}
                sizes="(max-width: 768px) 100vw, (max-width: 1360px) 50vw, 680px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
