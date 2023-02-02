const Video = ({ src }: { src?: string }) => {
  const sourceUrl = src || 'https://www.youtube.com/embed/9oPEfKL4ZuU';
  if (sourceUrl.includes('youtube'))
    return (
      <div className="yt-video">
        <iframe
          width="3840"
          height="2160"
          src={sourceUrl}
          title="Япон улсын №1 түргэн хоолны сүлжээ ресторан ЁОШИНОЯА брэнд"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );

  return <video src={src} controls autoPlay loop></video>;
};

export default Video;
