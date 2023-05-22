import Video from 'components/news/Video';

const Advice = ({videos}) => {
  return (
    <div className="container">
      <Video posts={videos} title/>
    </div>
  );
};

export default Advice;
