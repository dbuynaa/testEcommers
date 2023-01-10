import NewsBanner from 'components/news/banner';
import Scroll from 'components/news/scroll';
import NewsSlider from 'components/news/NewsSlider';

const News = () => {
  return (
    <div className="container py-3">
      <div className="row news-header">
        <NewsBanner />
        <Scroll />
      </div>
      <NewsSlider />
    </div>
  );
};

export default News;
