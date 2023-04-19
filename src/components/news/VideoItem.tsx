import Modal from 'ui/Modal';
import Image from 'ui/Image';
import dayjs from 'dayjs';
import Play from 'icons/Play';
import { useState } from 'react';

const VideoItem = ({ title, featuredImage, date, video }) => {
  const [show, setShow] = useState(false);
  return (
    <Modal
      trigger={
        <div className="news-video-item px-2">
          <div className="img-wrap ratio">
            <Image src={featuredImage?.sourceUrl} alt="" />
            <div className="-shadow inset-0">
              <Play className="play-logo" />
            </div>
          </div>
          <div className="news-video-item-meta sbt py-2">
            <p>{dayjs(date).format('DD/MM/YYYY HH:mm')}</p>
            <p>#technews</p>
          </div>
          <div className="news-video-item-title sbt">
            <b className="sbt">{title}</b>
          </div>
        </div>
      }
      contentClassName="news-youtube-modal"
      open={show}
      onOpenChange={() => setShow((prev) => !prev)}
    >
      <div className="img-wrap yt-video ratio">
        {show && (
          <iframe
            src={`https://www.youtube.com/embed/${video?.videoId || ''}`}
            className="inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </Modal>
  );
};

export default VideoItem;
