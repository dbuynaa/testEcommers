import FeaturedCategory from './FeaturedCategory';
import { use } from 'react';
import { getFtCats, sortPosts } from 'lib/wp/posts';

const FeaturedCategories = () => {
  const { posts } = use(getFtCats());
  return (
    <div className=" my-5 ft-cats">
      <h4 className="bold text-blue text-center mb-4">Онцлох ангилал</h4>
      <div className="row">
        {sortPosts(posts || []).map((post, idx) => (
          <FeaturedCategory {...post} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
