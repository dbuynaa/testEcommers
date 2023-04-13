import Image from 'ui/Image';
import Button from 'ui/Button';
import type { WpPost } from 'lib/wp/posts';
import dayjs from 'dayjs';
import Link from 'next/link';

const NewsBanner = ({ post }: { post: WpPost }) => {
  const { featuredImage, title, date, id } = post;
  return (
    <div className="col-12 col-md-8">
      <div className="news-banner ">
        <div className="img-wrap ratio yt-video">
          <Image
            src={featuredImage?.sourceUrl || ''}
            alt=""
            sizes="(max-width: 768px) 100vw,(max-width: 1500px) 66vw, 50vw
          "
          />
        </div>
        <div className="news-banner-tag px-5 py-3 py-md-2 ">
          <b>Шинэ мэдээ</b>
        </div>
        <div className="-content p-3 p-md-5">
          <p className="-tag pb-1">
            #technews{' '}
            <span className="ps-1">{dayjs(date).format('YYYY-MM-DD')}</span>
          </p>
          <h5>{title}</h5>
          <Button
            variant="slim"
            className="mt-3"
            Component={Link}
            href={`/news/${id}`}
          >
            Цааш унших
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsBanner;
