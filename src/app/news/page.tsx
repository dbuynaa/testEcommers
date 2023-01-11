import NewsBanner from 'components/news/banner';
import Scroll from 'components/news/scroll';
import Other from 'components/news/Other';
import { getNews } from 'lib/wp/posts';
import { use } from 'react';

const News = () => {
  const { posts } = use(getNews());
  return (
    <div className="container py-3 news">
      <div className="row news-header">
        <NewsBanner post={(posts || [])[0]} />
        <Scroll posts={(posts || []).slice(1)} />
      </div>
      <Other />
    </div>
  );
};

export default News;
