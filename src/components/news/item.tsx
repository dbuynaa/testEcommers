import clsx from 'clsx';
import Image from 'ui/Image';
import Button from 'ui/Button';
import type { WpPost } from 'lib/wp/posts';
import dayjs from 'dayjs';
import Link from 'next/link';

const NewsItem = ({
  className,
  featuredImage,
  title,
  date,
  id,
}: WpPost & { className: string }) => {
  return (
    <div className={clsx('news-item row', className)}>
      <div className="img-wrap ratio">
        <Image
          alt=""
          src={featuredImage?.sourceUrl || ''}
          sizes={
            className === 'news-thumb'
              ? '(max-width: 768px) 33vw, (max-width: 1450px) 15vw, 10vw'
              : '(max-width: 768px) 100vw, (max-width: 1450px) 25vw, 20vw'
          }
        />
      </div>
      <div className="news-item-content ">
        <big className="block">{title}</big>
        <div className="flex justify-between text-mid-gray items-center">
          {dayjs(date).format('YYYY-MM-DD')}
          <Button
            variant="ghost"
            className="text-mid-gray"
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

export default NewsItem;
