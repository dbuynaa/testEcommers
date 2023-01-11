import NewsItem from './item';
import type { WpPost } from 'lib/wp/posts';

const Scroll = ({ posts }: { posts: WpPost[] }) => {
  return (
    <div className=" col-12 col-md-4">
      <div className="news-scroll hover-scroll ps-md-3">
        {(posts || []).map((post: any) => (
          <NewsItem className="news-thumb" {...post} key={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Scroll;
