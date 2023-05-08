import FeaturedProduct from './FeaturedProduct';
import { sortPosts } from 'lib/wp/posts';

const FeaturedProducts = ({ ftItems }: any) => {
  return (
    <div className="container">
      <div className="row ft-product-row my-4 ">
        <div className="col-md-6 col-12 p-1">
          <FeaturedProduct
            className="big"
            {...ftItems[0]}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="col-md-6 col-12">
          <div className="row">
            <div className="col-6 p-1">
              <FeaturedProduct
                className="small"
                {...ftItems[1]}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="col-6 p-1">
              <FeaturedProduct
                className="small"
                {...ftItems[2]}
                sizes="(max-width: 768px) 50vw,  25vw"
              />
            </div>
            <div className="col-12 p-1">
              <FeaturedProduct
                className="long"
                {...ftItems[3]}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
