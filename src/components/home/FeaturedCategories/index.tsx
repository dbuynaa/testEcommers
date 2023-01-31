import FeaturedCategory from './FeaturedCategory';
import { use } from 'react';
import { getFtCats, sortPosts } from 'lib/wp/posts';

const FeaturedCategories = () => {
  const { posts } = use(getFtCats());
  return (
    <div className="my-md-5 my-4 ft-cats container c-xl">
      <h4 className="text-blue text-center mb-md-4 mb-0">Онцлох ангилал</h4>
      <div className="row">
        {sortPosts(posts || []).map((post, idx) => (
          <FeaturedCategory {...post} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
