import NewsSlider from './NewsSlider';
import VideoItem from './VideoItem';

const Video = ({ posts }) => {
  return (
    <div className="my-md-5">
      <NewsSlider title="Видео, танилцуулга">
        {posts.map((post) => (
          <VideoItem key={post.id} {...post} />
        ))}
      </NewsSlider>
    </div>
  );
};

export default Video;
