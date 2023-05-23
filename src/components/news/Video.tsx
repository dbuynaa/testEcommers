import NewsSlider from './NewsSlider';
import VideoItem from './VideoItem';

const Video = ({ posts, title }: { posts: any[]; title?: any }) => {
  return (
    <div className="my-md-4 my-3">
      <NewsSlider title={title || 'Видео, танилцуулга'}>
        {posts.map((post) => (
          <VideoItem key={post.id || post.date} {...post} />
        ))}
      </NewsSlider>
    </div>
  );
};

export default Video;
